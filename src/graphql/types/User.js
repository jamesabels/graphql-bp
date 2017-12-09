import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInputObjectType } from "graphql";
import { Todo } from "./Todo";
import { fakeDatabase } from "../../data/FakeDatabase";

export const User = new GraphQLObjectType({
    name: "User",
    description: "All details of a user on the website",

    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
        token: { type: new GraphQLNonNull(GraphQLString) },
        todos: {
            type: new GraphQLList(Todo),
            resolve: (source) => {
                return fakeDatabase.getTodosOfUser(source.id);
            }
        }
    })
 });

export const UserRegisterType = new GraphQLInputObjectType({
    name: 'UserRegister',
    fields: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    }
});

export const UserLoginType = new GraphQLInputObjectType({
    name: 'UserLogin',
    fields: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    }
});

export const UserRemoveType = new GraphQLInputObjectType({
    name: 'UserRemove',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) }
    }
});