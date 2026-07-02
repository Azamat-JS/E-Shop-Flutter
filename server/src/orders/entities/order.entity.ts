import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
} from "typeorm";

import { ProductEntity } from "src/product/entities/product.entity";
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

    @Column("int", { array: true, default: [] })
    quantity!: number[];

    @Column()
    address!: string;

    @Column({
        default: "Pending"
    })
    status!: string;

    @CreateDateColumn()
    orderedAt!: Date;
}