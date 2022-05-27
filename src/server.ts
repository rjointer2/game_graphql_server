
import { ApolloServer, gql } from "apollo-server"



import typeDefs from "./typeDefs";
import resolvers from "./resolvers/combineResolvers";
import context from './middleware/context';




import connectDb from './connectDB';
import { Secret } from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config()

const _port = 1321;


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    csrfPrevention: false,
    cors: {
        origin: true,
        credentials: true,
    }
    
});

( async () => {

    connectDb()
    
    server.listen( _port, () => console.log('listening for request') )
    
})()




