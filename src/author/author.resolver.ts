import {Query, Mutation, Resolver, Subscription, ResolveProperty, DelegateProperty} from '@nestjs/graphql';
import { find, filter } from 'lodash';
import { PubSub } from 'graphql-subscriptions';
import {UseGuards} from "@nestjs/common";
import {AuthorGuard} from "./author.guard";
import {MergeInfo} from "graphql-tools/dist/Interfaces";
// example data
const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];
const posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];


// example pubsub
const pubsub = new PubSub();

@Resolver('Author')
export class AuthorResolver {
    @Query('author')
    @UseGuards(AuthorGuard)
    getAuthor(obj, args, context, info) {
        return find(authors, { id: args.id });
    }

    @Query('authors')
    @UseGuards(AuthorGuard)
    getAuthors(obj, args, context, info) {
        return authors;
    }
    @Subscription()
    commentAdded() {
        return {
            subscribe: () => pubsub.asyncIterator('commentAdded'),
        };
    }

    @Mutation()
    upvotePost(_, { postId }) {
        const post = find(posts, { id: postId });
        if (!post) {
            throw new Error(`Couldn't find post with id ${postId}`);
        }
        post.votes += 1;
        return post;
    }

    @ResolveProperty('posts')
    getPosts(author) {
        return filter(posts, { authorId: author.id });
    }


    // @Resolver('User')
    // @DelegateProperty('chirps')
    // findChirpsByUserId() {
    //     return (mergeInfo: MergeInfo) => ({
    //         fragment: `fragment UserFragment on User { id }`,
    //         resolve(parent, args, context, info) {
    //             const authorId = parent.id;
    //             return mergeInfo.delegate(
    //                 'query',
    //                 'chirpsByAuthorId',
    //                 {
    //                     authorId,
    //                 },
    //                 context,
    //                 info,
    //             );
    //         },
    //     });
    // }
}