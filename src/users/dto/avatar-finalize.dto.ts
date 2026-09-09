import { IsString } from "class-validator";

export class AvatarFinalizeDto {
    @IsString()
    fileName!: string
}