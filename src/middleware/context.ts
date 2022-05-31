
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import http, { IncomingMessage } from "http";
import { Express } from 'express'


type ID = string

export interface middleware {
    authenticate: ( id: ID ) => string
    authorize: () => {
        id: ID | null
        token: string
    }
    //endSession: () => void
}

dotenv.config();

const secret = process.env.SECRET as Secret
const expiration = '2h'


export default function middleware({ req , res } : { req: Express.Request & IncomingMessage & { session: {
    token: string
} }, res: Response }): middleware { 

    console.log(req.session.id, "test")

    return {
        authenticate: (id) => {
            const token = jwt.sign(
                {
                 data: id 
                }, secret, { expiresIn: expiration, algorithm: process.env.SR as unknown as jwt.Algorithm},
            )
                req.session.token = token
                console.log(req.session.id)
            return token;
        },
        authorize: () => {
            console.log(req.session.token)
            if( !req.session.token) return {
                id: "",
                token: ""
            };

            const token = req.session.token.split(' ').pop()

            if( !token ) return {
                id: "",
                token: ""
            }
            token.trim();

            const { data } = jwt.verify(token, secret, { maxAge: expiration }) as { data: ID } ;
            
            
            return {
                id: data,
                token: req.session.token
            }

        }
    }
}
