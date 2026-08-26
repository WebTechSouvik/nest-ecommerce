import { User } from "../../../src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { OrderStatus } from "../enum/order-status.enum";
import { OrderItem } from "./order-item.entity";
import { ShippingInfo } from "./shipping-info.entity";

@Entity()
export class Order {
    @PrimaryColumn('uuid')
    id!: string

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    orderStatus!: OrderStatus

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    taxPrice!: number

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    shippingPrice!: number

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    totalPrice!: number

    @OneToOne(() => ShippingInfo, (shippingInfo) => shippingInfo.order)
    shippingInfo!: ShippingInfo

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems!: OrderItem[]

    @ManyToOne(() => User, (user) => user.orders)
    customer!: User
}
