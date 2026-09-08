import { IsString } from "class-validator";

export class UploadAvtarDto {

    @IsString()
    fileName!: string
    @IsString()
    contentType!: string
}