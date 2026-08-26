import { User } from "../../../src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { CartItem } from "./cart-item.entity";

@Entity()
export class Cart {
    @PrimaryColumn('uuid')
    id!:string

    @OneToOne(()=>User)
    @JoinColumn()
    owner!:User

    @OneToMany(()=>CartItem,(cartItem)=>cartItem.cart)
    cartItems!:CartItem[]
}
