"use strict";
//import { users, createUser, signInUser, me } from "./userResolvers";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userResolvers_1 = require("./userResolvers");
const userDictionary = {};
const resolvers = {
    Query: {
        me: userResolvers_1.me
    },
    Mutation: {
        signIn: userResolvers_1.signIn,
        createUser: userResolvers_1.createUser
    },
    Token: {
        // This resolver fires in succession of the "signIn" or "createUser"
        data: (__, _, middleware) => __awaiter(void 0, void 0, void 0, function* () {
            const {} = middleware.authorize();
            return {
                username: "",
                token: ''
            };
        })
    },
};
exports.default = resolvers;
