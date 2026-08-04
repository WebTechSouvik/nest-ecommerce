import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SuccessMessage } from 'src/common/decorator/success-message.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './jwt.guard';

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

  @UseGuards(JwtGuard)
  @Get('profile')
  @SuccessMessage('User Profile Retrieved Successfully')
  async getProfile() {
    return;
  }

}
