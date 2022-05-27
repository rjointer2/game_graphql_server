"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `

    type LoggedInUser {
        message: String
        data: Data
    }

    type Data {
        username: String
        password: String
        email: String
        rank: Int
    }

    type Query {
        user: LoggedInUser
    }

    type Mutation {
        signIn ( username: String!, password: String! ): LoggedInUser
    }

`;
exports.default = typeDefs;
/*

type User {
        username: String
        data: Data
    }

    type Data {
        password: String
        email: String
        rank: Int
    }

    type Query {
        user: User
    }

*/
/* type User {
        username: String
        password: String
        email: String
        rank: Int
    }

    type Auth {
        token: String
        message: String
    }

    type ME {
        user: User
    }


    type Query {
       users: [User]
       me: User
    }

    type Mutation {
        createUser ( username: String!, password: String!, email: String! ): Auth
        signInUser ( username: String!, password: String!, ): Auth
    } */ 
