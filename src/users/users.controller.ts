import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Request } from 'express';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { SuccessMessage } from 'src/common/decorator/success-message.decorator';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { UploadAvtarDto } from './dto/upload-avatar.dto';
import { AvatarFinalizeDto } from './dto/avatar-finalize.dto';

@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @UseGuards(JwtGuard)
  @Post('avatar/upload-url')
  async uploadAvatar(@Body() uploadAvtarDto: UploadAvtarDto, @CurrentUser('id') userId: string) {
    return await this.usersService.generateSignedUrlForUploadAvatar(uploadAvtarDto, userId)
  }

  @UseGuards(JwtGuard)
  @Post('avatar/finalize')
  @SuccessMessage('user avatar finalized sucessfully')
  avatarFinalize(@Body() avatarFinalizeDto: AvatarFinalizeDto, @CurrentUser('id') userId: string) {
    return this.usersService.uploadAvatarFInalize(avatarFinalizeDto, userId)

  }

  @Get('profile')
  @UseGuards(JwtGuard)
  @SuccessMessage('user profile fetch succesfully')
  async findProfile(@CurrentUser('id') userId: string) {
    return await this.usersService.findOneById(userId)

  }


}
