import { questionServices } from '../services/question.service'
import { Request, Response } from 'express'
import {QuestionschemaValidate} from '../models/Question'
import { User } from '../models/User'

class questionController {
    //add question controller
    addQuestion = async (req: Request, res: Response) => {
        if (!req.body.user) {
            res.json({msg: `User doesn't selected!`})
            return
        }

        let cuser = await User.findById({_id: req.body.user})
        if (!cuser) {
            res.json({msg: `User doesn't exist!`})
            return
        }
        //data to be saved in database
        const data = {
            title: req.body.title,
            content: req.body.content,
            user: cuser,
            created_at: new Date(),
        }
        //validating the request
        const {error, value} = QuestionschemaValidate.validate(data)

        if(error){
            res.send(error.message)

        }else{
            //call the create question function in the service and pass the data from the request
            const question = await questionServices.createQuestion(value)
            res.status(201).send(question)          
        }
        
    }

    //get all questions
    getQuestions = async (req: Request, res: Response) => {
        const questions = await questionServices.getQuestions()
        res.send(questions)
    }


    //get a single question
    getAQuestion = async (req: Request, res: Response) => {
        //get id from the parameter
        const id = req.params.id
        const question = await questionServices.getQuestion(id)
        res.send(question)
    }

    //update question
    updateQuestion = async (req: Request, res: Response) => {
        const id = req.params.id
        const question = await questionServices.updateQuestion(id, req.body)  
        res.send(question)
    }


    //delete a question
    deleteQuestion = async (req: Request, res: Response) => {
        const id = req.params.id
        await questionServices.deleteQuestion(id)
        res.send('question deleted')
    }

}

//export class
export const QuestionController = new questionController()