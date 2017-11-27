import { User } from "../types/User";
import { fakeDatabase } from "../../data/FakeDatabase";
import { validateLogin } from "../../libs/crypto";

export default {
    me: {
        type: User,
        description: 'Get Current User',
        resolve: (source) => {
            return validateLogin(source, (token, email) => {
                return fakeDatabase.getUserByEmail(email);
            })
        }
    },
}