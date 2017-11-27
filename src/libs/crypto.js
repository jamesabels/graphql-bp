import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import { fakeDatabase } from "../data/FakeDatabase";

export const SECRET = '^zG]+KOoY17ElLM;97bwIUe2;4V68(hDDaNJLd6]=n>AHW$d*oX]GD3S"?f]K[RRFSDDZXCSDSF';

export function generateHash (password, saltRounds) {
    return bcrypt.hash(password, saltRounds);
}

export function validateHash (password, hash) {
    return bcrypt.compare(password, hash);
}

export function generateToken(exp, data, secret) {
    return jwt.sign({
    data: { email: data.email },
    }, secret, {expiresIn: exp});
}

export function verifyToken(token, secret) {
    return jwt.verify(token, secret)
}

export function validateLogin(source, callback) {
    let token = verifyToken(source.token, SECRET);
    let currentUser = fakeDatabase.verifyUserByEmail(token.data.email);
    if (currentUser.email === token.data.email && currentUser.token === source.token) {
        return callback(token, token.data.email);
    } else {
        return null;
    }
}

export function generateUUID() {
    return uuidv4();
}