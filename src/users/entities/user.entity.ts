import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enum/user-role.enum";
import * as argon2 from "argon2";
import { Order } from "src/orders/entities/order.entity";
import { Cart } from "src/carts/entities/cart.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({
        unique: true,
    })
    username!: string

    @Column({
        unique: true,
    })
    email!: string

    @Column()
    fullName!: string

    @Column({
        nullable: true
    })
    avatarUrl!: string

    @Column({
        nullable: true
    })
    avatarKey!: string

    @Column({
        select: false
    })
    password!: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role!: UserRole

    @OneToMany(() => Order, (order) => order.customer)
    orders!: Order[]

    @OneToOne(() => Cart, (cart) => cart.owner)
    cart!: Cart

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password)
    }

}
