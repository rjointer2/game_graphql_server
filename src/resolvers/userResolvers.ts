
import User, { UserSchema } from "../MongoDB/models"
import bcrypt from "bcrypt";
import { Model, Document, Types } from "mongoose";
import { middleware } from "../middleware/context";


type User = {
    username: string
    password: string
    email: string
    rank: number
}

export const signIn = async ( _: never, args: { username: string, password: string }, context: middleware) => {

    const user = await User.findOne({ username: args.username });

    if( !user ) return {
        message: "Username or User doesn't exist...",
        data: null
    }

    // salt compare password then create token to pass to childern resolvers
    if( await bcrypt.compare( args.password, user.password ) ) {
        // create token from the user data from mongo collection
        // using the context's middleware
        return {
            message: "Auth Token created and awaiting for authenication...",
            token: context.authenticate({ username: user.username, email: user.email, id: user.id })
        }

    }



}


/* export const createUser = async ( _: never, args: User, context: never ):
Promise<{ message: string }> => {

    const existingUser = await User.findOne({ email: args.email, username: args.username })
    
    if( !existingUser ) {
        const saltRounds = 10;
        args.password = await bcrypt.hash( args.password, saltRounds );
        await User.create(args)
        return {
            message: "User creeated successfully"
        }
    }

    let err = ""

    if( existingUser.username === args.username ) err += "Username ";
    if( existingUser.email === args.email ) err += "& Email ";

    err+= "have been taking already";

    existingUser.email = err;
    return {
        message: err
    }
    
}

export const users = async ( _: never, args: User, context: never ): Promise<Model<UserSchema, {}, {}, {}>[]> => {

    const usersArray = await User.find();
    return [User]

}


export const signInUser = async ( _: never, args: User, context: middleware ): 
Promise<{ message: string, token: string | null }> => {

    const user = await User.findOne({ username: args.username });

    if( !user ) {
        console.log( 'User not found at signInUser Resolver' )
        return {
            message: "User Not Found",
            token: null
        }
    }
    
    if( !await bcrypt.compare(args.password, user.password) ) return {
        message: "Incorrect Password Used",
        token: null
    }

    const { username, email, id } = user;

    const token = context.authenticate({ 
        username, email, id
    })

    return {
        message: "",
        token: token
    }

}   

export const me = async ( _: never, args: User, context: middleware ) => {

    context.verify()
    

}


export const updateUser = async ( _: never, args: User, context: never ) => {

    

} */