import { Controller, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { RestaurantService } from './restaurant.service';
import { restodto } from './restodto.dto';
import { v4 } from 'uuid';
import { isUUID } from 'class-validator';
import path from 'path';
import { imageFileFilter } from 'src/filter/fileupload.filter';
import { diskStorage } from 'multer';
import { editFileName } from 'src/filter/editfilename';


@Controller('restaurant')
export class RestaurantController {
    constructor(private restoService: RestaurantService) { }

    @Post()
    addResto(@Body() restodata: restodto) {
        return this.restoService.getAddResto(restodata)
    }

    @Get()
    showResto() {
        return this.restoService.showAllResto()
    }

    @Get(':id')
    showRestoOne(@Param('id') id: string) {
        return this.restoService.showOneResto(id)
    }

    @Put(':id')
    updateResto(@Param('id') id: string, @Body() Restodata: restodto) {
        return this.restoService.getUpdateResto(id, Restodata)
    }

    @Delete(':id')
    removeResto(@Param('id') id: string) {
        return this.restoService.getRemoveResto(id)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
              filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }),
    )
    uploadfile(@UploadedFile() file) {
        const response = { originalname: file.originalname, filename: file.filename }
        console.log(response)

    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './files' });
    }
}
