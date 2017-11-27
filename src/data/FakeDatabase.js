import { generateUUID } from "../libs/crypto";

class FakeDatabase{
    
        constructor() {
            this.users = [];
    
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

        updateUser (user) {
            let i = this.users.indexOf(user);
            this.users.splice(i, 1);
        }
    }
    
    export const fakeDatabase = new FakeDatabase();