import { Type } from "class-transformer"
import { IsInt, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateReviewDto {
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 1 })
    rating!: number

    @IsOptional()
    @IsString()
    description!: string



}
