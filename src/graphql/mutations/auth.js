import { SECRET, generateHash, generateToken } from '../../libs/crypto';
import { User, UserAuthType, UserLoginType, UserRegisterType, UserRemoveType } from "../types/User";
import { fakeDatabase } from "../../data/FakeDatabase";

export const userLogin = {
    userLogin: {
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
    userRegister: {
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

export const userRemove = {
    userRemove: {
        type: User,
        description: 'Remove and existing user.',
        args: {
            user: { type: UserRemoveType }
        },
        resolve: (parent, {user}) => {
            return fakeDatabase.removeUser(user);
        }
    }
};