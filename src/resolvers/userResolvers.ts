
import User, { UserSchema } from "../MongoDB/models"
import bcrypt from "bcrypt";
import { Model, Document, Types } from "mongoose";
import { middleware } from "../middleware/context";
import { ApolloError } from "apollo-server-express";


export type UserType = {
    id: string
    username: string
    password: string
    email: string
    rank: number
}

export type Token = UserType

type AuthenticationObjectType = {
    message: string, data?: UserType | null
}

export const signIn = async ( _: never, args: { username: string, password: string }, middleware: middleware): 
Promise<AuthenticationObjectType> => {

    const user = await User.findOne({ username: args.username });

    if( !user ) return {
        message: "Username or User doesn't exist...",
        data: null
    }

    // salt compare password then create token to pass to childern resolvers
    if( await bcrypt.compare( args.password, user.password ) ) {
        // create token from the user data from mongo collection
        // using the context's middleware
        middleware.authenticate(user.id)
        return {
            message: "Auth Token created and awaiting for authenication...",
        }

    }

    return {
        message: 'Incorrect Password Used...',
        data: null
    }

}

export const createUser = async (  
    _: never, args: { username: string, password: string, email: string }, middleware: middleware
): Promise<AuthenticationObjectType> => {

    args.password = await bcrypt.hash(args.password, 10)
    
    return await User.create(args).then( user => {
        middleware.authenticate(user.id)
        return {
            message: "User Created Successfully...",
        }
    }).catch(( err: ApolloError ) => {

        let message = "Errors when creating User,"

        if( err.message.includes('password') ) message += " Password doesn't filfull requirements, ";
        if( err.message.includes('username') ) message += " Username already exist, ";
        if( err.message.includes('email') ) message += " Email has beem used already, ";

        return {
            message,
            data: null
        }
    })
}

export const me = async (  
    _: never, __: any, middleware: middleware
) => {

    console.log(middleware.authorize())



}
