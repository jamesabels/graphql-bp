import { SECRET, generateHash, generateToken } from '../../libs/crypto';
import {User, UserAuthType, UserLoginType, UserRegisterType} from "../types/User";
import { fakeDatabase } from "../../data/FakeDatabase";

export const userLogin = {
    login: {
        type: User,
        description: 'Authenticate a user.',
        args: {
            user: { type: UserLoginType }
        },
        resolve: (parent, {user}) => {
            return fakeDatabase.getUserByEmail(user.email)
        }
    }
};

export const userRegister = {
    register: {
        type: User,
        description: 'Register a new user.',
        args: {
            user: { type: UserRegisterType }
        },
        resolve: (parent, {user}) => {
            user.role = 'user';
            user.password = generateHash(user.password, 12);
            user.token = generateToken('1y', { email: user.email }, SECRET);
            return fakeDatabase.addNewUser(user);
        }
    }
};