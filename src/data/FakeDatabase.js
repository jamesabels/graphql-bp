import { generateUUID, generateHash } from "../libs/crypto";

class FakeDatabase{
    
        constructor() {
            this.users = [{
                id: "66cf6fdc-d762-4766-a22a-93b24a8dfba6",
                username: "SteveDave",
                email: "steve@dave.com",
                password: "$2a$12$fXyWZqvkpnglImS6cfl7IOQnqX8NtYd78pOQ7pcKgp1qOEL.xUfXG",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoic3RldmVAZGF2ZS5jb20ifSwiaWF0IjoxNTExODA4Mjk2LCJleHAiOjE1NDMzNjU4OTZ9.XmHCm3WYzoAuLQ9cp4a37yX7pqBQyJhGjWGI59NxzfE"
            }];
    
            this.todos = [];
        }
    
        // ------------------------------------------------------------
        //                      READ METHODS
        // ------------------------------------------------------------
        getTodos() {
            // Here you would make a db connection + query + return data
            return this.todos;
        }
    
        getTodoById(id) {
            return this.todos.filter((todo) => {
                return todo.id === id;
            })[0];
        }

        getUsers() {
            return this.users;
        }

        verifyUserByEmail (email) {
            let user = this.getUserByEmail(email);
            if (user.email === email) {
                return user
            } else {
                return null
            }
        }


        getUserById(userId) {
            return this.users.filter((user) => {
                return user.id === userId;
            })[0];
        }

        getUserByEmail (email) {
            return this.users.filter((user) => {
                return user.email === email;
            })[0];
        }
    
        getTodosOfUser(userId) {
            return this.getTodos().filter((item) => {
                return item.user === userId;
            });
        }
    
    
    
        // ------------------------------------------------------------
        //                      WRITE METHODS
        // ------------------------------------------------------------
        addNewTodo(todo) {
            todo.id = generateUUID();
            this.todos.push(todo);
            return todo;
        }

        addNewUser(user) {
            user.id = generateUUID();
            this.users.push(user);
            return user;
        }
        
        removeUser (user) {
            let i = this.users.indexOf(user);
            this.users.splice(i, 1);
            return user;
        }

        updateTodo (todo) {
            let i = this.todos.indexOf(todo);
            this.todos.splice(i, 1, todo);
            return todo;
        }

        removeTodo (todo) {
            let i = this.todos.indexOf(todo);
            this.todos.splice(i, 1);
            return todo;
        }
    }
    
    export const fakeDatabase = new FakeDatabase();