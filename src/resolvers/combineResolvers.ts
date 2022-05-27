
//import { users, createUser, signInUser, me } from "./userResolvers";

import User, { UserSchema } from "../MongoDB/models";
import { signIn } from './userResolvers'

const userDictionary: any = {}


const resolvers = {
    Query: {
        
    }, 
    Mutation: {
        signIn
    },
    AuthToken: {
        data: ( user: { data: UserSchema }) => {
            // Used after signIn Mutation
            //- Data shape must invoked as signIn Object => Data Object User props
            if( user.data ) return user.data;
            // if user parent data exist return parent user data or excute data resolver
            return null
        }
    },
}


export default resolvers;