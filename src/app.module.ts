import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {CatsModule} from "./cats/cats.module";
import {CatsService} from "./cats/cats.service";
import {LoggerMiddleware} from "./middleware/logger.middleware";
import {funLoggerMiddleware} from "./middleware/funLogger.middleware";
import {CatsController} from "./cats/cats.controller";
import {PhotoModule} from "./photo/photo.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./auth/auth.module";
import { graphqlExpress,graphiqlExpress } from 'apollo-server-express';
import { GraphQLModule,GraphQLFactory } from '@nestjs/graphql';
import {AuthorsModule} from "./author/author.module";
import {mergeSchemas,makeExecutableSchema} from "graphql-tools";

const chirpSchema = makeExecutableSchema({
    typeDefs: `
    type Chirp {
      id: ID!
      text: String
      authorId: ID!
    }

    type Query {
      chirpById(id: ID!): Chirp
      chirpsByAuthorId(authorId: ID!): [Chirp]
    }
  `
});
const linkTypeDefs = `
  extend type User {
    chirps: [Chirp]
  }

  extend type Chirp {
    author: User
  }
`;

@Module({
    controllers:[AppController],
    imports: [
        GraphQLModule,
        AuthorsModule,
        AuthModule,
        TypeOrmModule.forRoot(),CatsModule,PhotoModule,MongooseModule.forRoot('mongodb://localhost/mytestdb')],
})
export class ApplicationModule implements NestModule{
    constructor(private catsService:CatsService,private readonly graphQLFactory: GraphQLFactory) {
    }
    configure(consumer: MiddlewaresConsumer): void {
        // consumer.apply(LoggerMiddleware).forRoutes(
        //     { path: '/cats', method: RequestMethod.GET },
        //     { path: '/cats', method: RequestMethod.POST },
        // );

        const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
        const localSchema = this.graphQLFactory.createSchema({ typeDefs });
        // const delegates = this.graphQLFactory.createDelegates();
        // const schema = mergeSchemas({
        //     schemas: [localSchema, chirpSchema, linkTypeDefs],
        //     resolvers: delegates,
        // });
        consumer.apply(LoggerMiddleware)
            .with('ApplicationModule')
            .forRoutes(AppController);

        // consumer
        //     .apply(graphqlExpress(req => ({ schema: schema, rootValue: req })))
        //     .forRoutes({ path: '/graphql', method: RequestMethod.ALL });

        consumer
            .apply(graphiqlExpress({ endpointURL: '/graphql' }))
            .forRoutes({ path: '/graphiql', method: RequestMethod.GET })
            .apply(graphqlExpress(req => ({ schema:localSchema, rootValue: req })))
            .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
    }
}
