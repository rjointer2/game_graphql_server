
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import http, { IncomingMessage } from "http";


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


export default function middleware({ req , res } : { req: IncomingMessage, res: Response }): middleware { 

    return {
        authenticate: (id) => {
            console.log(req.headers.authorization )
            const token = jwt.sign(
                {
                 data: id 
                }, secret, { expiresIn: expiration, algorithm: process.env.SR as unknown as jwt.Algorithm},
            )
                req.headers.authorization = token
            return token;
        },
        authorize: () => {
            
            if( !req.headers.authorization ) return {
                id: "",
                token: ""
            };
            console.log(req.headers.authorization)
            const token = req.headers.authorization.split(' ').pop()

            if( !token ) return {
                id: "",
                token: ""
            }
            token.trim();

            const { data } = jwt.verify(token, secret, { maxAge: expiration }) as { data: ID } ;
            
            
            return {
                id: data,
                token: req.headers.authorization 
            }

        }
    }
}
