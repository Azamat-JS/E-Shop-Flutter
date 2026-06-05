import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsString()
    category!: string;

    @IsArray()
    @IsString({ each: true })
    images!: string[];

    @IsNotEmpty()
    @IsNumber()
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    price!: number;
}
