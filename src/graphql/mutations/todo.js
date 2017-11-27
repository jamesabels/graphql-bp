import { GraphQLNonNull, GraphQLInt } from "graphql";
import { Todo, TodoInputType } from "../types/Todo";
import { fakeDatabase } from "../../data/FakeDatabase";

export default {
    addTodo: {
        type: Todo,
        description: 'This creates a new todo.',
        args: {
           todo: { type: TodoInputType }
        },
        resolve: (parent, {todo}) => {
            return fakeDatabase.addNewTodo(todo);
        }
    }
}