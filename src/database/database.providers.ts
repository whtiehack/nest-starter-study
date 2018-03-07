import { createConnection } from 'typeorm';
import * as mongoose from 'mongoose';


export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'nesttest',
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
         //   autoSchemaSync: true,
            "synchronize": true
        }),
    },
    {
        provide: 'MongooseDbConnectionToken',
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect('mongodb://localhost/mytestdb', {
                useMongoClient: true,
            });
        },
    },
    
];