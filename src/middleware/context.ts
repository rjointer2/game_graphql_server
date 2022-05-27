
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { IncomingMessage } from "http";

type RequestHeaders  = {
    headers: {
        authorization: string
    }
}

export interface middleware {
    authenticate: ({ username, email, id } : { username: string, email: string, id: string }) => string
    /* verify: () => { username: string, email: string, id: string }
    endSession: () => void */
}

dotenv.config();

const secret = process.env.SECRET as Secret
const expiration = '2h'


export default function middleware({ req , res } : { req: IncomingMessage, res: Response }): middleware {
    return {
        authenticate: ({ username, email, id }) => {
            return jwt.sign(
                {
                 data: { username, email, id } 
                }, secret, { expiresIn: expiration, algorithm: "HS256" },
            );
        }
    }
}



/* 



*/