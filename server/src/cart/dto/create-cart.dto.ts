import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartDto {
    @IsString()
    @IsNotEmpty()
    productId!: string;

    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsNumber()
    @IsNotEmpty()
    quantity!: number;
}
