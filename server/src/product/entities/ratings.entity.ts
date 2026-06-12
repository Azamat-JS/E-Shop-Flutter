import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Unique,
} from "typeorm";

import { ProductEntity } from "./product.entity";
import { AuthEntity } from "src/auth/entities/auth.entity";

@Entity({ name: "ratings" })
@Unique(["user", "product"]) // one rating per user per product
export class RatingEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        type: "int",
    })
    value!: number; // 1-5 stars

    @ManyToOne(() => AuthEntity, (user) => user.ratings, {
        onDelete: "CASCADE",
    })
    user!: AuthEntity;

    @ManyToOne(() => ProductEntity, (product) => product.ratings, {
        onDelete: "CASCADE",
    })
    product!: ProductEntity;
}