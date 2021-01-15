import { Body, Delete, Get, Param } from '@nestjs/common';
import { Put } from '@nestjs/common';
import {  Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { userdto } from './userdto.dto';

@Controller('user')
export class UserController {
    constructor (private serviceuser: UserService){}

    @Post()
    addUser(@Body() userdata: userdto){
        return this.serviceuser.getAddUser(userdata)
    }

    @Get()
    showUser(){
        return this.serviceuser.showAllUser()
    }

    @Get(':id')
    showUserOne(@Param('id') id:string){
        return this.serviceuser.showOneUser(id)
    }

    @Put(':id')
    updateUser(@Param('id') id:string,@Body() userdata: userdto){
        return this.serviceuser.getUpdateUser(id, userdata)
    }

    @Delete(':id')
    removeUser(@Param('id') id:string){
        return this.serviceuser.getRemoveUser(id)
    }

}
