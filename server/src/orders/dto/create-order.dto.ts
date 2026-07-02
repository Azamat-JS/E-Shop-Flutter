import { IsIn, IsNotEmpty, IsString, } from "class-validator";

export class CreateOrderDto {
    // @IsNotEmpty()
    // @IsString()
    // userId!: string;

    // @IsNotEmpty()
    // @IsString()
    // userId!: string;

    // @IsNotEmpty()
    // @IsString()
    // userId!: string;


}

export class UpdateOrderDto {
    @IsNotEmpty()
    @IsString()
    @IsIn(['Pending', 'Completed', 'Received', 'Delivered'])
    status!: string;
}



