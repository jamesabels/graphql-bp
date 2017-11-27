import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import { User, UserLoginType } from "./types/User";
import { Todo, TodoInputType } from "./types/Todo";
import { fakeDatabase } from "../data/FakeDatabase";
import { verifyToken, SECRET, validateLogin } from "../libs/crypto";

// // Import mutations
import addTodo from './mutations/todo';
import {userLogin, userRegister, } from "./mutations/auth";

export const ViewerType = new GraphQLObjectType({
    name: 'Viewer',
    description: 'Viewer',
    fields: () => ({
        me: {
            type: User,
            description: 'Get Current User',
            resolve: (source) => {
                return validateLogin(source, (token, email) => {
                    return fakeDatabase.getUserByEmail(email);
                })
            }
        },
        user: {
            type: User,
            description: "Get a specific user",
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: function (source, {id}) {
                return validateLogin(source, () => {
                    return fakeDatabase.getUserById(id);
                })
            }
        },
        users: {
            type: new GraphQLList(User),
            description: 'Get all users',
            resolve: (source) => {
                return validateLogin(source, () => {
                    return fakeDatabase.getUsers(source.email);
                })
            }
        },
        todo: {
            type: Todo,
            description: "Get details of a single todo",
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: function (source, {id}) {
                return validateLogin(source, () => {
                    return fakeDatabase.getTodoById(id);
                })
            }
        },
        todos: {
            type: new GraphQLList(Todo),
            description: "Get a list of recent todos",
            args: {},
            resolve: function (source) {
                return validateLogin(source, (token, email) => {
                    return fakeDatabase.getTodos();
                })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        viewer: {
            type: ViewerType,
            args: {
                token: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(source, args ) {
                return { token: args.token };
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: new GraphQLObjectType({
        name: 'RootMutation',
        fields: () => ({
            ...addTodo,
            ...userLogin,
            ...userRegister
        })
    })
});

export default Schema;