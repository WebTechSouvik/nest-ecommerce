import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm"
import { Order } from "./order.entity"

@Entity()
export class ShippingInfo {
    @PrimaryColumn('uuid')
    id!: string
    @Column()
    address!: string
    @Column()
    city!: string
    @Column()
    pincode!: string
    @Column()
    country!: string
    @Column()
    state!: string
    @Column()
    phoneNumber!: number
    @OneToOne(() => Order, order => order.shippingInfo)
    order!: Order
}


