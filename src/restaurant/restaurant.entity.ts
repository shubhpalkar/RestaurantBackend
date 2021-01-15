import { Stream } from "stream";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Url } from "url";

@Entity('Restaurant')
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: String

    @Column()
    address: string

    @Column()
    phone: number

    @Column()
    foodType: string


    @Column()
    Payment: String

    // @Column()
    // restoPic: string
}
