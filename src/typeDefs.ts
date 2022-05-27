
import { gql } from "apollo-server";

const typeDefs = gql`

    type AuthToken {
        message: String
        token: String
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
        signIn ( username: String!, password: String! ): AuthToken
    }

`;

export default typeDefs;


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