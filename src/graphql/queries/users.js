import { GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";
import { User } from "../types/User";
import { fakeDatabase } from "../../data/FakeDatabase";
import { validateLogin } from "../../libs/crypto";

export const user = {
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
}

export const users = {
    users: {
        type: new GraphQLList(User),
        description: 'Get all users',
        resolve: (source) => {
            return validateLogin(source, () => {
                return fakeDatabase.getUsers(source.email);
            })
        }
    },
}