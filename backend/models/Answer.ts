import { Schema, model } from "mongoose";
import Joi from "joi";

// validate Schema
export const AnswerschemaValidate = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    user: Joi.object().required(),
    question: Joi.object().required(),
    created_at: Joi.date().required()
})

//creating an interface 
interface IAnswers {
    title: string,
    content: string,
    user: Object,
    question: Object,
    created_at: Date
}

//Answerschema
const answerSchema = new Schema<IAnswers>({
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
    question: {
        type: Object,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
    },
})

//creating a model
 export const Answer = model<IAnswers>('Answer', answerSchema )