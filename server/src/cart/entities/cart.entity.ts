import { AuthEntity } from "src/auth/entities/auth.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";

@Entity({ name: "cart" })
@Unique(["user", "product"])
export class CartEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => AuthEntity, {
        onDelete: "CASCADE",
    })
    user!: AuthEntity;

    @ManyToOne(() => ProductEntity, {
        onDelete: "CASCADE",
    })
    product!: ProductEntity;

    @Column({
        type: "int",
        default: 1,
    })
    quantity!: number;
}