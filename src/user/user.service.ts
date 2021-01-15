import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { userdto } from './userdto.dto';

@Injectable()
export class UserService {
    constructor (@InjectRepository(User) private userRepo: Repository<User>){}

    getAddUser(userdata){
        const check = this.userRepo.findOne(userdata.email)

        if (check){
            throw new HttpException ('This user is already existed', HttpStatus.BAD_REQUEST)
        }
        return this.userRepo.save(userdata)
    }

    showAllUser(){
        return this.userRepo.find()
    }

    showOneUser(id: string){
        const result =  this.userRepo.findOne(id)

        if (!result){
            throw new HttpException('Not Found id', HttpStatus.NOT_FOUND)
        }

        return result;
    }

    getUpdateUser(id: string, data: userdto): Promise<any>{
        const result =  this.userRepo.findOne(id)

        if (!result){
            throw new HttpException('Not Found id', HttpStatus.NOT_FOUND)
        }

        return this.userRepo.update(id, data)
    }

    getRemoveUser(id: string): Promise<any>{
        const result =  this.userRepo.findOne(id)

        if (!result){
            throw new HttpException('Not Found id', HttpStatus.NOT_FOUND)
        }

        return this.userRepo.delete(id)
    }
}
