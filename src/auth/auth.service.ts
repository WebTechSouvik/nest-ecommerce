import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as argon2 from "argon2";
import jwtConfig from 'src/config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService, @Inject(jwtConfig.KEY) private readonly jwtConfigValue: ConfigType<typeof jwtConfig>) { }

    async register(user: RegisterDto) {
        const exsistUserByEmail = await this.userService.findByEmail(user.email)
        if (exsistUserByEmail) throw new ConflictException('Email already exsist')
        await this.userService.create(user)

    }

    async login(userCredentials: LoginDto) {
        const exsistUserByEmail = await this.userService.findByEmailWithPassword(userCredentials.email)
        if (!exsistUserByEmail) throw new NotFoundException('user with email not found')
        const isValidPassword = await argon2.verify(exsistUserByEmail.password, userCredentials.password,)
        if (!isValidPassword) throw new UnauthorizedException('Invalid password')
        const jwtPayload = {
            sub: exsistUserByEmail.id,
            role: exsistUserByEmail.role
        }
        const accessToken = await this.jwtService.signAsync(jwtPayload, {
            secret: this.jwtConfigValue.access.secret,
            expiresIn: this.jwtConfigValue.access.expiry as JwtSignOptions['expiresIn']
        })
        const refreshToken = await this.jwtService.signAsync(jwtPayload, {
            secret: this.jwtConfigValue.refresh.secret,
            expiresIn: this.jwtConfigValue.refresh.expiry as JwtSignOptions['expiresIn']
        })

        return {
            accessToken,
            refreshToken
        }

    }
}
