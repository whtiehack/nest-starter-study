


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

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
 //   @Roles('admin')
    async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    @UseGuards(RolesGuard)
 //   @ReflectMetadata('roles', ['admin'])
    @UseInterceptors(TransformInterceptor)
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get('/exception')
    @UseFilters(new HttpExceptionFilter())
    async exception(@Body() createCatDto: CreateCatDto) {
        throw new ForbiddenException();
    }

    @Get('/cacheInterceptor')
    @UseInterceptors(CacheInterceptor)
    async getAllCached(): Promise<Cat[]> {
        return this.catsService.findAll();
    }
}