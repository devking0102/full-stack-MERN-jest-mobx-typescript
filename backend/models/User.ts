import { Schema, model } from "mongoose";
import Joi from "joi";

// validate Schema
export const UserschemaValidate = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    birth: Joi.string().required(),
})

//creating an interface 
interface IUsers {
    email: string,
    firstName: string,
    lastName: string,
    gender: String,
    birth: string
}

//Userschema
const userSchema = new Schema<IUsers>({
    email: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    birth: {
        type: String,
        required: true
    }
    
})

//creating a model
 export const User = model<IUsers>('User', userSchema )