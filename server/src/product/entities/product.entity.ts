import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RatingEntity } from "./ratings.entity";

@Entity({ name: "products" })
export class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column({ type: 'simple-array' })
    images!: string[];

    @Column({ type: 'int' })
    quantity!: number;

    @Column({ type: 'float' })
    price!: number;

    @Column()
    category!: string;

    @OneToMany(() => RatingEntity, (rating) => rating.product)
    ratings!: RatingEntity[];
}
