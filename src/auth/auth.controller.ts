import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import type { Response } from 'express';
import { SuccessMessage } from 'src/common/decorator/success-message.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,

  ) { }


  @Post('register')
  @SuccessMessage('User Register Successful')
  async createUser(@Body() user: RegisterDto, @Res() res: Response) {
    console.log('hi')

    await this.authService.register(user)




  }

}
