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
    console.log(req.session.id, "test");
    return {
        authenticate: (id) => {
            const token = jsonwebtoken_1.default.sign({
                data: id
            }, secret, { expiresIn: expiration, algorithm: process.env.SR });
            req.session.token = token;
            console.log(req.session.id);
            return token;
        },
        authorize: () => {
            console.log(req.session.token);
            if (!req.session.token)
                return {
                    id: "",
                    token: ""
                };
            const token = req.session.token.split(' ').pop();
            if (!token)
                return {
                    id: "",
                    token: ""
                };
            token.trim();
            const { data } = jsonwebtoken_1.default.verify(token, secret, { maxAge: expiration });
            return {
                id: data,
                token: req.session.token
            };
        }
    };
}
exports.default = middleware;
