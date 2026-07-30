import { IsEnum, IsOptional, IsString, } from "class-validator"
import { UserRole } from "../enum/user-role.enum"
export class CreateUserDto {

    @IsString()
    username!: string

    @IsString()
    email!: string

    @IsString()
    fullName!: string

    @IsString()
    password!: string

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole
}
