import getEntityResolver from './util/entity-resolver';
import {GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLInt} from 'graphql';
import StoryType from './types/StoryType';
import UserType from './types/UserType';
import {registerType} from './resolve-map';
import * as types from './types';

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',

        fields: () => ({
            story: {
                type: StoryType,

                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },

                resolve: getEntityResolver('Story')
            },

            user: {
                type: UserType,

                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },

                resolve: getEntityResolver('User')
            }
        })
    })
});

module.exports = schema;