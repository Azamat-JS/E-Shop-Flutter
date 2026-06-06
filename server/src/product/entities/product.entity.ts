import { AuthEntity } from "src/auth/entities/auth.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "products" })
export class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column({ type: 'simple-array' })
    image_urls!: string[];

    @Column({ type: 'int' })
    quantity!: number;

    @Column({ type: 'float' })
    price!: number;

    @Column()
    category!: string;
}
