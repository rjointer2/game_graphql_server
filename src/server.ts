
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import express from 'express';
import http from 'http';


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
});


( async () => {

    const app = express();

    app.use(session({
        secret: process.env.SECRET as string,
        name: 'ekug&^Hn',
        saveUninitialized: true,
        resave: true,
    }))

    const httpServer = http.createServer(app)


    await server.start();
    server.applyMiddleware({ app });

    httpServer.listen( _port, () => {
        connectDb();
    })

})()



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



