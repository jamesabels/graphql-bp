import { GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLNonNull } from "graphql";
import { User } from "./User";
import { fakeDatabase } from "../../data/FakeDatabase";

export const Todo = new GraphQLObjectType({
    name: "Todo",
    description: "All details of a todo",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        user: {
            type: User,
            resolve: (todo) => {
                return fakeDatabase.getUserById(todo.user)
            }
        }
    })
});

export const TodoInputType = new GraphQLInputObjectType({
    name: 'TodoInput',
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(GraphQLString) }
    }
});