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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.createUser = exports.signIn = void 0;
const models_1 = __importDefault(require("../MongoDB/models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signIn = (_, args, middleware) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.default.findOne({ username: args.username });
    if (!user)
        return {
            message: "Username or User doesn't exist...",
            data: null
        };
    // salt compare password then create token to pass to childern resolvers
    if (yield bcrypt_1.default.compare(args.password, user.password)) {
        // create token from the user data from mongo collection
        // using the context's middleware
        middleware.authenticate(user.id);
        return {
            message: "Auth Token created and awaiting for authenication...",
        };
    }
    return {
        message: 'Incorrect Password Used...',
        data: null
    };
});
exports.signIn = signIn;
const createUser = (_, args, middleware) => __awaiter(void 0, void 0, void 0, function* () {
    args.password = yield bcrypt_1.default.hash(args.password, 10);
    return yield models_1.default.create(args).then(user => {
        middleware.authenticate(user.id);
        return {
            message: "User Created Successfully...",
        };
    }).catch((err) => {
        let message = "Errors when creating User,";
        if (err.message.includes('password'))
            message += " Password doesn't filfull requirements, ";
        if (err.message.includes('username'))
            message += " Username already exist, ";
        if (err.message.includes('email'))
            message += " Email has beem used already, ";
        return {
            message,
            data: null
        };
    });
});
exports.createUser = createUser;
const me = (_, __, middleware) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(middleware.authorize());
});
exports.me = me;
