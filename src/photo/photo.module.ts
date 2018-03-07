import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import {DatabaseModule} from "../database/database.module";
import {photoProviders} from "./photo.providers";

@Module({
    // imports: [TypeOrmModule.forFeature([Photo])],
    // components: [PhotoService],
    imports: [DatabaseModule],
    components: [
        ...photoProviders,
        PhotoService,
    ],
    controllers: [PhotoController],
})
export class PhotoModule {}