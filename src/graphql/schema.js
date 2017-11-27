import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import { User, UserLoginType } from "./types/User";
import { Todo, TodoInputType } from "./types/Todo";
import { fakeDatabase } from "../data/FakeDatabase";
import { verifyToken, SECRET, validateLogin } from "../libs/crypto";

// Import mutations
import addTodo from './mutations/todo';
import { userLogin, userRegister } from "./mutations/auth";

// Import Queries
import me from './queries/me';
import { user, users } from './queries/users';
import { todo, todos } from './queries/todos';

export const ViewerType = new GraphQLObjectType({
    name: 'Viewer',
    description: 'Viewer',
    fields: () => ({
        ...me,
        ...user,
        ...users,
        ...todo,
        ...todos
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