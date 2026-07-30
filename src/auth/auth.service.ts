import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService) { }

    async register(user: RegisterDto) {
        const exsistUserByEmail = await this.userService.findByEmail(user.email)
        if (exsistUserByEmail) throw new ConflictException('Email already exsist')
        await this.userService.create(user)

    }
}
