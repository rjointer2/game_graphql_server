"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
