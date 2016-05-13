import getEntityResolver from '../util/entity-resolver';
import {getType, registerType} from '../resolve-map';
import {GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLString} from 'graphql';

const StoryType = new GraphQLObjectType({
    name: 'Story',
    description: '@TODO DESCRIBE ME',

    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '@TODO DESCRIBE ME'
        },

        text: {
            type: GraphQLString,
            description: '@TODO DESCRIBE ME'
        },

        authorId: {
            type: GraphQLInt,
            description: '@TODO DESCRIBE ME'
        }
    })
});

registerType(StoryType);
export default StoryType;