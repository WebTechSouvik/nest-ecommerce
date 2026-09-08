import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { S3Service } from 'src/common/service/s3.service';
import { UploadAvtarDto } from './dto/upload-avatar.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private readonly s3Service: S3Service) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto)
      await this.userRepository.save(newUser)

    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to create user')
    }

  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id
    });
    if (!user) throw new NotFoundException('user not found')
    return user
  }

  async findByEmail(email: string) {

    return await this.userRepository.findOne({
      where: {
        email
      }
    })

  }
  async findByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: {
        email
      },
      select: { id: true, email: true, password: true, role: true }
    })
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async generateSignedUrlForUploadAvatar(uploadAvtarDto: UploadAvtarDto) {
    const { contentType, fileName } = uploadAvtarDto
    const [name, extension] = fileName.split(".")
    const key = `avatars/${crypto.randomUUID()}-${name}.${extension}`
    const signedUrl = await this.s3Service.getPreSignedUrlForUploadObject(key, contentType)
    return {
      uploadUr: signedUrl,
      key
    }
  }
}
