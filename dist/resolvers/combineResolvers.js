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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../MongoDB/models"));
const userDictionary = {};
const resolvers = {
    Query: {},
    Mutation: {
        signIn: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield models_1.default.findOne({ username: args.username });
            if (!user)
                return {
                    message: "Incorrect Username or Password",
                    data: null
                };
            return {
                message: "Logged In Succesfully...",
                data: user
            };
        })
    },
    LoggedInUser: {
        data: (user) => {
            return user.data;
        }
    },
};
/*

Query: {
        user: () => {
            return {
                username: 'Bob'
            }
        }
    },
    User: {
        data: (_: any) => {
            console.log(_)
            return {
                password: _.username === "Bob" ? "BobPassword" : "secret"
            }
        }
    }

*/
/* const resolvers = {
    Query: {
        me,
        users
    },
    Mutation: {
        createUser,
        signInUser,
    }
} */
exports.default = resolvers;
