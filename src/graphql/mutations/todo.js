import { GraphQLNonNull, GraphQLInt } from "graphql";
import { Todo, TodoInputType, TodoUpdateType, TodoRemoveType } from "../types/Todo";
import { fakeDatabase } from "../../data/FakeDatabase";

export const addTodo = {
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

export const updateTodo = {
    updateTodo: {
        type: Todo,
        description: 'This updates an existing todo.',
        args: {
           todo: { type: TodoUpdateType }
        },
        resolve: (parent, {todo}) => {
            return fakeDatabase.updateTodo(todo);
        }
    }
}

export const removeTodo = {
    removeTodo: {
        type: Todo,
        description: 'This removes an existing todo.',
        args: {
           todo: { type: TodoRemoveType }
        },
        resolve: (parent, {todo}) => {
            return fakeDatabase.removeTodo(todo);
        }
    }
}