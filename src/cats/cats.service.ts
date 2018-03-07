import {Component, Inject} from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import {InjectModel} from "@nestjs/mongoose";
import {CatSchema} from "./schemas/cats.schema";
import { Model } from 'mongoose';
import {Cat as CatEntity} from './cat.entity';

@Component()
export class CatsService {
    constructor(@Inject('AsyncDbConnection') asyncConn,
                /*@InjectModel(CatSchema)*/@Inject('CatModelToken') private readonly catModel: Model<Cat>,
                @Inject('CatsRepository') private readonly catsRepository: typeof CatEntity
                ){
        console.log('~~ async db connection',asyncConn);
    }

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        const createdCat = new this.catModel(createCatDto);
        return await createdCat.save();
    }

    async createSequelize(createCatDto: CreateCatDto): Promise<Boolean> {
        return this.catsRepository.insertOrUpdate(createCatDto);
    }

    async findAll(): Promise<Cat[]> {
        return await this.catModel.find().exec();
    }

    async findAllSequelize(): Promise<CatEntity[]> {
        return await this.catsRepository.findAll<CatEntity>();
    }
}