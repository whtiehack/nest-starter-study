
import { Connection } from 'mongoose';
import { CatSchema } from './schemas/cats.schema';
import {Cat} from "./cat.entity";

export const catsProviders = [
    {
        provide: 'CatModelToken',
        useFactory: (connection: Connection) => connection.model('Cat', CatSchema),
        inject: ['MongooseDbConnectionToken'],
    },
    {
        provide: 'CatsRepository',
        useValue: Cat,
    },
];