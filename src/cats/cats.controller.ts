


import {Controller, Get, Post, Body, UseFilters, UseGuards, UseInterceptors} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import {ForbiddenException} from "../forbidden.exception";
import {HttpExceptionFilter} from "../http-exception.filter";
import {ValidationPipe} from "../pipe/validation.pipe";
import {RolesGuard} from "../roles.guard";
import {Roles} from "../roles.decorator";
import {LoggingInterceptor} from "../interceptors/logging.interceptor";
import {TransformInterceptor} from "../interceptors/transform.interceptor";
import {CacheInterceptor} from "../interceptors/cache.interceptor";
import {Cat as CatEntity} from './cat.entity';
import {ApiUseTags} from "@nestjs/swagger";
import {mixinCacheInterceptor} from "../interceptors/mixin-cache.interceptor";

@ApiUseTags('cats')
@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
 //   @Roles('admin')
    async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
        return this.catsService.create(createCatDto);
    }



    @Post('/seq')
    //   @Roles('admin')
    async createSequelize(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
        return this.catsService.createSequelize(createCatDto);
    }

    @Get('/seq')
    @UseGuards(RolesGuard)
    //   @ReflectMetadata('roles', ['admin'])
    @UseInterceptors(TransformInterceptor)
    async findAllSequelize(): Promise<Cat[]> {
        return this.catsService.findAllSequelize();
    }

    @Get()
    @UseGuards(RolesGuard)
 //   @ReflectMetadata('roles', ['admin'])
    @UseInterceptors(TransformInterceptor)
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Post('/exception')
    @UseFilters(new HttpExceptionFilter())
    async exception(@Body() createCatDto: CreateCatDto) {
        throw new ForbiddenException();
    }

    @Get('/cacheInterceptor')
    @UseInterceptors(mixinCacheInterceptor(()=>true))
    async getAllCached(): Promise<Cat[]> {
        return this.catsService.findAll();
    }
}