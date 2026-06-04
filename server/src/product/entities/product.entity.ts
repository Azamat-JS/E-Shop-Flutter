import { Column, PrimaryGeneratedColumn } from "typeorm";

export class ProductEntity {
    @PrimaryGeneratedColumn()
    id!: string;

}
