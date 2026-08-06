import { Body, Controller, Post } from '@nestjs/common';
import { SuccessMessage } from 'src/common/decorator/success-message.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,

  ) { }


  @Post('register')
  @SuccessMessage('User Register Successful')
  async createUser(@Body() user: RegisterDto) {
    await this.authService.register(user)

  }
  @Post('login')
  @SuccessMessage('User Login Successful')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user)
  }



}
