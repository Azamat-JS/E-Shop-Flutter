import { RatingEntity } from "src/product/entities/ratings.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "auth" })
export class AuthEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    type?: string;

    @OneToMany(() => RatingEntity, (rating) => rating.user)
    ratings!: RatingEntity[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}
