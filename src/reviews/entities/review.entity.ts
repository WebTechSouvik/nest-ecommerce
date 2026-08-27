import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({
        type: 'decimal'
    })
    rating!: number

    @Column({
        nullable: true
    })
    description!: string

    @ManyToOne(() => Product, (product) => product.reviews)
    product!: Product

    @ManyToOne(() => User, (user) => user.reviews)
    user!: User
}
