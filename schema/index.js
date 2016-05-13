'use strict';

const co = require('co');
const graphql = require('graphql');

const {resolver} = require('graphql-sequelize');

module.exports = co.wrap(function *({User, Story}) {

    const userType = new graphql.GraphQLObjectType({
        name: 'User',
        description: 'User model representation',
        fields: function () {
            return {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID),
                    description: 'The id of the user.'
                },
                name: {
                    type: graphql.GraphQLString,
                    description: 'The name of the user.'
                },
                birthday: {
                    type: graphql.GraphQLString,
                    description: 'The Birthday'
                },
                friends: {
                    type: new graphql.GraphQLList(userType),
                    description: 'The friends of the user, or an empty list if they have none.',
                    resolve: resolver(User)
                },
                stories: {
                    type: new graphql.GraphQLList(storyType),
                    resolve(parent, args, source) {
                        return Story.findAll({where: {author_id: parent.id}});
                    }
                }
            }
        }
    });

    const storyType = new graphql.GraphQLObjectType({
        name: 'Story',
        description: 'Story model representation',
        fields: function () {
            return {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID),
                    description: 'The id of the user.'
                },
                text: {
                    type: graphql.GraphQLString,
                    description: 'The text of story'
                },
                author: {
                    type: userType,
                    description: 'The User',
                    resolve(parent, args, source) {
                        return User.findOne({where: {id: parent.author}});
                    }
                }
            }
        }
    });

    const query = new graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
            user: {
                type: userType,
                args: {
                    id: { type: graphql.GraphQLString },
                    count: { type: graphql.GraphQLInt }
                },
                resolve: function (context, args, source, fieldASTs) {
                    // root ?
                    return User.findOne({where: {id: args.id}, limit: args.count});
                }
            },
            story: {
                type: storyType,
                args: {
                    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) }
                },
                resolve: function (context, args, source, fieldASTs) {
                    // root ?
                    return Story.findOne({where: {id: args.id}});
                }
            }
        }
    });

    const schema = new graphql.GraphQLSchema({
        query: query
    });

    return {schema};
});

/*
{
    user(id: "1", count: 1) {
    id
    name
    birthday
    stories {
        id
        text
    }
    friends {
        id
        name
        birthday
    }
}
}
*/