
import { gql } from "apollo-server";

const typeDefs = gql`

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

export default typeDefs;
