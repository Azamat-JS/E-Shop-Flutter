import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from "typeorm";

import { ProductEntity } from "./product.entity";
import { AuthEntity } from "src/auth/entities/auth.entity";

@Entity({ name: "orders" })
export class OrderEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;


    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
    })
    totalPrice!: number;


    @ManyToOne(() => AuthEntity)
    user!: AuthEntity;


    @ManyToOne(() => ProductEntity)
    product!: ProductEntity;


    @Column()
    quantity!: number;


    @Column()
    address!: string;


    @Column({
        default: "PENDING"
    })
    status!: string;


    @CreateDateColumn()
    orderedAt!: Date;
}