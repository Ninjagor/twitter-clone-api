"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.newJwt = void 0;
var jwt = require('jsonwebtoken');
require('dotenv').config();
function newJwt(data) {
    return jwt.sign({
        data: data
    }, process.env.JWT_SECRET);
}
exports.newJwt = newJwt;
function verifyJwt(token) {
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (_a) {
        return false;
    }
}
exports.verifyJwt = verifyJwt;
var testJwt = newJwt({
    username: "testuser3",
    password: "hahahaha!"
});
console.log(testJwt);
// console.log(verifyJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdHVzZXIzIiwicGFzc3dvcmQiOiJoYWhhaGFoYSEifSwiaWF0IjoxNjg5NTI0NzUwfQ.LCNxGBEQilxpP2-BRV5hZ5I6_8tnEF04xXVz2HAxSNI"))
