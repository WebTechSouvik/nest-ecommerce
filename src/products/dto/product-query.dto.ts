import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, Min, MIN, ValidateNested } from "class-validator";
class PriceFilter {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    gte?: number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    lte?: number
}
export class ProductQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page = 1

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit = 10

    @IsOptional()
    @Transform(({ value }) => {
        return typeof value === 'string' ?
            value.split(',').map((item) => item.trim()).filter(Boolean) : value
    })
    @IsArray()
    @IsString({
        each: true
    })
    category?: string[]

    @IsOptional()
    @ValidateNested()
    @Type(() => PriceFilter)
    price?: PriceFilter


}