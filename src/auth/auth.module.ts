import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule, JwtModule.registerAsync({
    inject: [jwtConfig.KEY],
    useFactory: (jwtConfigValue: ConfigType<typeof jwtConfig>) => ({
      secret: jwtConfigValue.access.secret,
      signOptions: {
        expiresIn: jwtConfigValue.access.expiry as JwtSignOptions['expiresIn']
      }
    })
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
