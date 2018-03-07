import {Inject, MiddlewaresConsumer, Module, NestModule} from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {LoggerMiddleware} from "../middleware/logger.middleware";
import {funLoggerMiddleware} from "../middleware/funLogger.middleware";
import {AppController} from "../app.controller";
import {asyncDbConnection, connectionProvider} from "./tokenProvider";
import {MongooseModule} from "@nestjs/mongoose";
import {CatSchema} from "./schemas/cats.schema";
import {DatabaseModule} from "../database/database.module";
import {catsProviders} from "./cats.providers";

@Module({
    controllers: [CatsController],
    imports: [
        DatabaseModule,
    //    MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])
    ],
    components: [CatsService, connectionProvider,asyncDbConnection,
        ...catsProviders,
    ],
    exports: [CatsService]
})
export class CatsModule implements NestModule {
    constructor(private readonly catsService: CatsService,@Inject('ConnectionToken') private  connection: String) {
        console.log('~~~ my connection',connection);
    }
    configure(consumer: MiddlewaresConsumer): void {
        // consumer.apply(LoggerMiddleware).forRoutes(
        //     { path: '/cats', method: RequestMethod.GET },
        //     { path: '/cats', method: RequestMethod.POST },
        // );
        consumer.apply(funLoggerMiddleware).forRoutes(CatsController);
    }
}