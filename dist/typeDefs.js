"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `

    type Token {
        message: String
        data: User
    }

    type User {
        token: String
        username: String
        password: String
        email: String
        rank: Int
    }

    type Query {
        token: Token
        me: User
    }

    type Mutation {
        signIn ( username: String!, password: String! ): Token
        createUser ( username: String!, password: String!, email: String! ): Token
    }

`;
exports.default = typeDefs;
