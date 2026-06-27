import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

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

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsNumber()
    rating?: number;
}

export class OrderProductDto {
    @IsNotEmpty()
    @IsString()
    id!: string;

    @IsNotEmpty()
    @IsNumber()
    quantity!: number;
}

export class OrderDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderProductDto)
    products!: OrderProductDto[];

    @IsNotEmpty()
    @IsNumber()
    totalPrice!: number;

    @IsNotEmpty()
    @IsString()
    address!: string;
}
