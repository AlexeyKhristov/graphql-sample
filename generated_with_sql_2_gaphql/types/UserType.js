import getEntityResolver from '../util/entity-resolver';
import {getType, registerType} from '../resolve-map';
import {GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLString} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: '@TODO DESCRIBE ME',

    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '@TODO DESCRIBE ME'
        },

        name: {
            type: GraphQLString,
            description: '@TODO DESCRIBE ME'
        },

        birthday: {
            type: GraphQLString,
            description: '@TODO DESCRIBE ME'
        }
    })
});

registerType(UserType);
export default UserType;