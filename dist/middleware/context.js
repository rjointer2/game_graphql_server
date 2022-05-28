"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.SECRET;
const expiration = '2h';
function middleware({ req, res }) {
    return {
        authenticate: (id) => {
            console.log(req.headers.authorization);
            const token = jsonwebtoken_1.default.sign({
                data: id
            }, secret, { expiresIn: expiration, algorithm: process.env.SR });
            req.headers.authorization = token;
            return token;
        },
        authorize: () => {
            if (!req.headers.authorization)
                return {
                    id: "",
                    token: ""
                };
            console.log(req.headers.authorization);
            const token = req.headers.authorization.split(' ').pop();
            if (!token)
                return {
                    id: "",
                    token: ""
                };
            token.trim();
            const { data } = jsonwebtoken_1.default.verify(token, secret, { maxAge: expiration });
            return {
                id: data,
                token: req.headers.authorization
            };
        }
    };
}
exports.default = middleware;
