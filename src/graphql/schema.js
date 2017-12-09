import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

// Import mutations
import { addTodo, updateTodo, removeTodo } from './mutations/todo';
import { userLogin, userRegister, userRemove } from "./mutations/auth";

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
            ...updateTodo,
            ...removeTodo,
            ...userLogin,
            ...userRegister,
            ...userRemove
        })
    })
});

export default Schema;