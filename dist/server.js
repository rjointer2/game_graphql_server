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
const apollo_server_express_1 = require("apollo-server-express");
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const combineResolvers_1 = __importDefault(require("./resolvers/combineResolvers"));
const context_1 = __importDefault(require("./middleware/context"));
const connectDB_1 = __importDefault(require("./connectDB"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _port = 1321;
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: combineResolvers_1.default,
    context: context_1.default,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use((0, express_session_1.default)({
        secret: process.env.SECRET,
        name: 'ekug&^Hn',
        saveUninitialized: true,
        resave: true,
    }));
    const httpServer = http_1.default.createServer(app);
    yield server.start();
    server.applyMiddleware({ app });
    httpServer.listen(_port, () => {
        (0, connectDB_1.default)();
    });
}))();
/* const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    csrfPrevention: false,
    cors: {
        origin: '*',
        credentials: true,
        exposedHeaders: ['authorization'],
        allowedHeaders: [ "authorization", "Access-Control-Allow-Credentials", "true", "Content-Type", "Access-Control-Allow-Origin","Access-Control-Allow-Headers", 'Access-Control-Expose-Headers']
    }
    
});

( async () => {

    connectDb()
    
    server.listen( _port, () => console.log('listening for request') )
    
})()
 */
