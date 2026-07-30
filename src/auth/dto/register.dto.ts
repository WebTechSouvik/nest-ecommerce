import { IsString } from "class-validator"
export class RegisterDto {

    @IsString()
    username!: string

    @IsString()
    email!: string

    @IsString()
    fullName!: string

    @IsString()
    password!: string


}
