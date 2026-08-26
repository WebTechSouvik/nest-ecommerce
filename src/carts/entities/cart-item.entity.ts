import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "../../../src/products/entities/product.entity";

@Entity('cart_itmes')

export class CartItem {
    @PrimaryColumn('uuid')
    id!: string

    @ManyToOne(() => Cart,(cart)=>cart.cartItems)
    cart!: Cart

    @ManyToOne(() => Product, (product) => product.cartItems)
    product!: Product

    @Column('int', {
        default: 1
    })
    quantity!: number
}