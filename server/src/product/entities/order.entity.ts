import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
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

    @ManyToMany(() => ProductEntity)
    @JoinTable()
    products!: ProductEntity[];

    @Column()
    address!: string;

    @Column({
        default: "PENDING"
    })
    status!: string;

    @CreateDateColumn()
    orderedAt!: Date;
}