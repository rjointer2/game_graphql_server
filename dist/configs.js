"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.UN);
const database_configs = `mongodb+srv://${process.env.UN}:${process.env.PW}@${process.env.DB}.gwqfk.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
exports.default = database_configs;
