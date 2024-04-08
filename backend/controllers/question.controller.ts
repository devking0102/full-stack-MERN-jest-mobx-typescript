import { questionServices } from '../services/question.service'
import { Request, Response } from 'express'
import {QuestionschemaValidate} from '../models/Question'
import { User } from '../models/User'

class questionController {
    //add question controller
    addQuestion = async (req: Request, res: Response) => {
        if (!req.body.user_id) {
            res.status(404).json({
                success: false,
                msg: `User doesn't selected!`
            })
            return
        }

        let user = await User.findById({_id: req.body.user_id})
        if (!user) {
            res.status(404).json({
                success: false,
                msg: `User doesn't exist!`
            })
           return
        }
        //data to be saved in database
        const data = {
            title: req.body.title,
            content: req.body.content,
            user: user,
            created_at: new Date(),
        }
        //validating the request
        const {error, value} = QuestionschemaValidate.validate(data)

        if(error){
            res.status(404).json({
                success: false,
                msg: error.message
            })

        }else{
            //call the create question function in the service and pass the data from the request
            const result = await questionServices.createQuestion(value)
            res.status(201).json(result)          
        }
        
    }

    //get all questions
    getAllQuestions = async (req: Request, res: Response) => {
        const result = await questionServices.getAllQuestions()
        res.json(result)
    }

    //get paginated questions
    getQuestions = async (req: Request, res: Response) => {
        const {limit, offset} = req.query
        await questionServices.getQuestions(limit, offset).then((result: any) => {
            res.json(result)
        })
    }

    //get a single question
    getAQuestion = async (req: Request, res: Response) => {
        //get id from the parameter
        const id = req.params.id
        const result = await questionServices.getQuestion(id)
        res.json(result)
    }

    //update question
    updateQuestion = async (req: Request, res: Response) => {
        const id = req.params.id
        if (!id) {
            res.status(404).json({
                success: false,
                msg: `Question doesn't exist!`
            })
            return
        }

        if (!req.body.user_id) {
            res.status(404).json({
                success: false,
                msg: `User doesn't selected!`
            })
            return
        }

        let user = await User.findById({_id: req.body.user_id})
        if (!user) {
            res.status(404).json({
                success: false,
                msg: `User doesn't exist!`
            })
            return
        }
        //data to be saved in database
        const data = {
            title: req.body.title,
            content: req.body.content,
            user: user,
            created_at: new Date(),
        }
        //validating the request
        const {error, value} = QuestionschemaValidate.validate(data)

        if(error){
            res.status(404).json({
                success: false,
                msg: error.message
            })

        }else{
            //call the update answer function in the service and pass the data from the request
            const result = await questionServices.updateQuestion(id, data)  
            res.json(result)
        }
    }


    //delete a question
    deleteQuestion = async (req: Request, res: Response) => {
        const id = req.params.id
        const result = await questionServices.deleteQuestion(id)
        res.json(result)
    }

}

//export class
export const QuestionController = new questionController()