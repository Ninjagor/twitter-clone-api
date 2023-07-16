"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var jwt_1 = require("./utils/jwt");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var jwt = require('jsonwebtoken');
var prisma = new client_1.PrismaClient();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.json({ "data": "twitter clone api" });
});
// THE FOLLOWING ENDPOINTS ARE USER AND POST CREATION ENDPOINTS
// Creating user. I wrote a bunch of stupid if statements that really have no purpose (i could have gotten email from req.body and it would have returned null if it wasnt there anyways instead of writing conditionals to check if email existed), but too lazy to remove them and write the correct code. But it works so who cares :D
app.post('/api/create/user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, userData, token, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                password = req.body.password;
                if (req.body.email) {
                    userData = {
                        username: username,
                        email: req.body.email,
                        password: password
                    };
                }
                else {
                    userData = {
                        username: username,
                        password: password
                    };
                }
                token = (0, jwt_1.newJwt)(userData);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                user = void 0;
                if (!req.body.email) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            username: username,
                            email: req.body.email,
                            password: password
                        }
                    })];
            case 2:
                user = _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, prisma.user.create({
                    data: {
                        username: username,
                        password: password
                    }
                })];
            case 4:
                user = _a.sent();
                _a.label = 5;
            case 5:
                console.log({ "data": "successfully created user!", "user": user });
                res.status(200).json({ "data": "success", "user": user, "token": token });
                return [3 /*break*/, 7];
            case 6:
                e_1 = _a.sent();
                res.status(500).json({ "data": "internal server error", "errorinfo": e_1, "summary": "invalid `req.body`, check types and keys" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// Creating posts via token auth. I did good code this time :)
app.post('/api/create/post', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, postTitle, postContent, token, tokenData, userName, confUser, post, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, postTitle = _a.postTitle, postContent = _a.postContent, token = _a.token;
                tokenData = (0, jwt_1.verifyJwt)(token);
                if (!tokenData) return [3 /*break*/, 6];
                userName = tokenData.data.username;
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            username: userName
                        }
                    })];
            case 1:
                confUser = _b.sent();
                console.warn("CONF USER PASS ".concat(confUser.password, " TOKEN PASS ").concat(tokenData.data.password, " EQUATION ").concat(!(confUser.password === tokenData.data.password)));
                if (!confUser) {
                    res.status(404).json({ "data": "invalid username" });
                    return [2 /*return*/];
                }
                if (!(confUser.password === tokenData.data.password)) {
                    res.status(401).json({ "data": "invalid credentials" });
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, prisma.post.create({
                        data: {
                            postTitle: postTitle,
                            postContent: postContent,
                            user: { connect: { username: userName } }
                        }
                    })];
            case 3:
                post = _b.sent();
                console.log({ "data": "successfully created post!", "post": post });
                res.status(200).json({ "data": "success", "post": post });
                return [3 /*break*/, 5];
            case 4:
                e_2 = _b.sent();
                res.status(500).json({ "data": "internal server error", "errorinfo": e_2, "summary": "idk figure it out" });
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(401).json({ "data": "invalid token" });
                _b.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
// THE FOLLOWING ARE AUTH ENDPOINTS
app.post('/api/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, confUser, data, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            username: username
                        }
                    })];
            case 1:
                confUser = _b.sent();
                if (!confUser) {
                    res.status(404).json({ "data": "user not found" });
                    return [2 /*return*/];
                }
                else if (!(confUser.password === password)) {
                    res.status(401).json({ "data": "invalid credentials" });
                    return [2 /*return*/];
                }
                else {
                    data = {
                        username: username,
                        password: password
                    };
                    token = (0, jwt_1.newJwt)(data);
                    res.status(200).json({ "data": "success", "token": token });
                }
                return [2 /*return*/];
        }
    });
}); });
// THE FOLLOWING ARE DB QUERY ENDPOINTS
// A get request to display posts to the user. This uses pagination so things dont get extremely overloaded
app.get('/api/getposts/:pageNumber', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postsPerPage, pageNumber, posts, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postsPerPage = 25;
                pageNumber = parseInt(req.params.pageNumber);
                return [4 /*yield*/, prisma.post.findMany({
                        skip: (pageNumber - 1) * postsPerPage,
                        take: postsPerPage,
                        orderBy: {
                            createdAt: 'desc'
                        }
                    })];
            case 1:
                posts = _a.sent();
                res.status(200).json({ "data": posts });
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(500).json({ "data": "internal server error", "summary": "no clue why this happened, maybe read the error report", "report": e_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () {
    console.log("App running on port 3000");
});
