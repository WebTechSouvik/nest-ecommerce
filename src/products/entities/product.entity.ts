import { CartItem } from "src/carts/entities/cart-item.entity";
import { OrderItem } from "src/orders/entities/order-item.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryColumn('uuid')
    id!: string

    @Column({
        unique: true,
    })
    name!: string

    @Column()
    description!: string

    @Column()
    price!: number

    @Column({
    })
    category!: string

    @Column({
        default: 0
    })
    avgRating!: number
    @Column({
        default: 1
    })
    stock!: number
    @Column({
        type: 'simple-array'
    })
    images!: string[]

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems!: OrderItem[]

    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItems!: CartItem[]
}
