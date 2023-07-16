import { User, Post } from "./types";
const jwt = require('jsonwebtoken');
require('dotenv').config()

export function newJwt(data: User) {
    return jwt.sign({
        data: data
    }, process.env.JWT_SECRET);
}

export function verifyJwt(token: String) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch {
        return false;
    }
}
