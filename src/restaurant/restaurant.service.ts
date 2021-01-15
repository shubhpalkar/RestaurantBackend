import { HttpStatus } from '@nestjs/common';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { restodto } from './restodto.dto';

@Injectable()
export class RestaurantService {
    constructor (@InjectRepository(Restaurant) private resoRepo: Repository<Restaurant>){}


    getAddResto(Restodata){
        // const check = this.resoRepo.findOne(Restodata.phone)

        // if (check){
        //     throw new HttpException ('This Resto is already existed', HttpStatus.BAD_REQUEST)
        // }
        return this.resoRepo.save(Restodata)
    }

    showAllResto(){
        return this.resoRepo.find()
    }

    showOneResto(id: string){
        const result =  this.resoRepo.findOne(id)

        if (!result){
            throw new HttpException('Not Found id', HttpStatus.NOT_FOUND)
        }

        return result;
    }

    getUpdateResto(id: string, data: restodto): Promise<any>{
        const result =  this.resoRepo.findOne(id)

        if (!result){
            throw new HttpException('Not Found id', HttpStatus.NOT_FOUND)
        }

        return this.resoRepo.update(id, data)
    }

    getRemoveResto(id: string): Promise<any>{
        const result =  this.resoRepo.findOne(id)

        if (!result){
            throw new HttpException('Not Found id', HttpStatus.NOT_FOUND)
        }

        return this.resoRepo.delete(id)
    }
}
