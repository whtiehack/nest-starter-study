import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Component()
export class PhotoService {
    constructor(
     //   @InjectRepository(Photo)
     @Inject('PhotoRepositoryToken')
        private readonly photoRepository: Repository<Photo>,
    ) {}

    async findAll(): Promise<Photo[]> {
        return await this.photoRepository.find();
    }
}