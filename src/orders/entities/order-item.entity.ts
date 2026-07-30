import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/products/entities/product.entity";

@Entity('order_items')
export class OrderItem {
    @PrimaryColumn('uuid')
    id!: string

    @ManyToOne(() => Order, (order) => order.orderItems)
    order!: Order

    @ManyToOne(() => Product, (product) => product.orderItems)
    product!: Product

    @Column('int', { default: 1 })
    quantity!: number
}