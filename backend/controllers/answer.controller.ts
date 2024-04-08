import { answerServices } from '../services/answer.service'
import { Request, Response } from 'express'
import {AnswerschemaValidate} from '../models/Answer'
import { User } from '../models/User'
import { Question } from '../models/Question'

class answerController {
    //add answer controller
    addAnswer = async (req: Request, res: Response) => {
        if (!req.body.user_id) {
            res.status(404).json({
                success: false,
                msg: `User doesn't selected!`
            })
            return
        }

        if (!req.body.question_id) {
            res.status(404).json({
                success: false,
                msg: `Question doesn't selected!`
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
        let question = await Question.findById({_id: req.body.question_id})
        if (!question) {
            res.status(404).json({
                success: false,
                msg: `Question doesn't exist!`
            })
            return
        }
        //data to be saved in database
        const data = {
            title: req.body.title,
            content: req.body.content,
            user: user,
            question: question,
            created_at: new Date(),
        }
        //validating the request
        const {error, value} = AnswerschemaValidate.validate(data)

        if(error){
            res.status(404).json({
                success: false,
                msg: error.message
            })

        }else{
            //call the create answer function in the service and pass the data from the request
            const result = await answerServices.createAnswer(value)
            res.status(201).json(result)          
        }
        
    }

    //get all answers
    getAnswers = async (req: Request, res: Response) => {
        const {user, limit, offset} = req.query
        let cuser = await User.findById({_id: user})
        
        if (!cuser) {
            res.status(404).json({
                success: false,
                msg: `User doesn't selected!`
            })
        }
        await answerServices.getAnswers(cuser, limit, offset).then((result: any) => {
            res.json(result)
        })
    }


    //get a single answer
    getAAnswer = async (req: Request, res: Response) => {
        //get id from the parameter
        const id = req.params.id
        const result = await answerServices.getAnswer(id)
        res.json(result)
    }

    //update answer
    updateAnswer = async (req: Request, res: Response) => {
        const id = req.params.id
        if (!id) {
            res.status(404).json({
                success: false,
                msg: `Answer doesn't exist!`
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

        if (!req.body.question_id) {
            res.status(404).json({
                success: false,
                msg: `Question doesn't selected!`
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
        let question = await Question.findById({_id: req.body.question_id})
        if (!question) {
            res.status(404).json({
                success: false,
                msg: `Question doesn't exist!`
            })
            return
        }
        //data to be saved in database
        const data = {
            title: req.body.title,
            content: req.body.content,
            user: user,
            question: question,
            created_at: new Date(),
        }
        //validating the request
        const {error, value} = AnswerschemaValidate.validate(data)

        if(error){
            res.status(404).json({
                success: false,
                msg: error.message
            })

        }else{
            //call the update answer function in the service and pass the data from the request
            const result = await answerServices.updateAnswer(id, data)  
            res.json(result)
        }
        
    }

    //delete a answer
    deleteAnswer = async (req: Request, res: Response) => {
        const id = req.params.id
        const { user_id } = req.query
        if (!user_id) {
            res.status(404).json({
                success: false,
                msg: `User doesn't selected!`
            })
            return
        }
        const user = await User.findById({_id: user_id})
        if (!user) {
            res.status(404).json({
                success: false,
                msg: `User doesn't exist!`
            })
            return
        }
        const result = await answerServices.deleteAnswer(id, user)
        res.json(result)
    }
}

//export class
export const AnswerController = new answerController()