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
const testJwt = newJwt({
    username: "testuser3",
    password: "hahahaha!"
})
console.log(testJwt)

// console.log(verifyJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdHVzZXIzIiwicGFzc3dvcmQiOiJoYWhhaGFoYSEifSwiaWF0IjoxNjg5NTI0NzUwfQ.LCNxGBEQilxpP2-BRV5hZ5I6_8tnEF04xXVz2HAxSNI"))