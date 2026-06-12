import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: 'float', nullable: true })
    rating?: number;
}
