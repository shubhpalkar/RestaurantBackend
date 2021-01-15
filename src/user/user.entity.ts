import { IsEmail, IsNotEmpty, IS_NOT_EMPTY, Matches, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "./Match.decorator";


@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    name: string

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Column()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string

    @Column()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Match('password')
    Confirmpassword: string
    
}
