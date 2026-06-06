import { AuthEntity } from "src/auth/entities/auth.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class ProductEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    image_urls!: string[];

    @Column({ type: 'int' })
    quantity!: number;

    @Column({ type: 'float' })
    price!: number;

    @Column()
    category!: string;
}
