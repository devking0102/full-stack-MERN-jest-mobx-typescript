import { Schema, Types, model } from "mongoose";
import Joi from "joi";

// validate Schema
export const QuestionschemaValidate = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    user: Joi.object().required(),
    created_at: Joi.date().required()
})

//creating an interface 
interface IQuestions {
    title: string,
    content: string,
    user: Object,
    created_at: Date
}

//Questionschema
const questionSchema = new Schema<IQuestions>({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    user: {
        type: Object,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
    },
})

//creating a model
 export const Question = model<IQuestions>('Question', questionSchema )