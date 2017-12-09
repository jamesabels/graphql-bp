import { GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";
import { Todo } from "../types/Todo";
import { fakeDatabase } from "../../data/FakeDatabase";
import { validateLogin } from "../../libs/crypto";

export const todo = {
    todo: {
        type: Todo,
        description: "Get details of a single todo",
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: function (source, { id }) {
            return validateLogin(source, () => {
                return fakeDatabase.getTodoById(id);
            })
        }
    }
}

export const todos = {
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
}

