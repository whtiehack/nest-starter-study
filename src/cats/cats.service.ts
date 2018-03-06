import {Component, Inject} from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import {InjectModel} from "@nestjs/mongoose";
import {CatSchema} from "./schemas/cats.schema";
import { Model } from 'mongoose';

@Component()
export class CatsService {
    constructor(@Inject('AsyncDbConnection') asyncConn, @InjectModel(CatSchema) private readonly catModel: Model<Cat>){
        console.log('~~ async db connection',asyncConn);
    }

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        const createdCat = new this.catModel(createCatDto);
        return await createdCat.save();
    }

    async findAll(): Promise<Cat[]> {
        return await this.catModel.find().exec();
    }
}