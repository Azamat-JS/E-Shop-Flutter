import { IsNumber } from "class-validator";

export class RateProductDto {
    @IsNumber()
    rating!: number;
}