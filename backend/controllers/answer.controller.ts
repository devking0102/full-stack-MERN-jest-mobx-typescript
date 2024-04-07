import { answerServices } from '../services/answer.service'
import { Request, Response } from 'express'
import {AnswerschemaValidate} from '../models/Answer'
import { User } from '../models/User'
import { Question } from '../models/Question'

class answerController {
    //add answer controller
    addAnswer = async (req: Request, res: Response) => {
        if (!req.body.user_id) {
            res.status(400).json(`User doesn't selected!`)
            return
        }

        if (!req.body.question_id) {
            res.status(400).json(`Question doesn't selected!`)
            return
        }

        let user = await User.findById({_id: req.body.user_id})
        if (!user) {
            res.status(400).json(`User doesn't exist!`)
            return
        }
        let question = await Question.findById({_id: req.body.question_id})
        if (!question) {
            res.status(400).json(`Question doesn't exist!`)
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
            res.status(404).send(error.message)

        }else{
            //call the create answer function in the service and pass the data from the request
            const answer = await answerServices.createAnswer(value)
            res.status(201).send(answer)          
        }
        
    }

    //get all answers
    getAnswers = async (req: Request, res: Response) => {
        const {user, limit, offset} = req.query
        let cuser = await User.findById({_id: user})
        
        if (!cuser) {
            res.status(400).send(`User doesn't selected!`)
        }
        await answerServices.getAnswers(cuser, limit, offset).then((result: any) => {
            res.send(result)
        })
    }


    //get a single answer
    getAAnswer = async (req: Request, res: Response) => {
        //get id from the parameter
        const id = req.params.id
        const answer = await answerServices.getAnswer(id)
        res.send(answer)
    }

    //update answer
    updateAnswer = async (req: Request, res: Response) => {
        const id = req.params.id
        if (!id) {
            res.status(400).json(`Answer doesn't exist!`)
            return
        }

        if (!req.body.user_id) {
            res.status(400).json(`User doesn't selected!`)
            return
        }

        if (!req.body.question_id) {
            res.status(400).json(`Question doesn't selected!`)
            return
        }

        let user = await User.findById({_id: req.body.user_id})
        if (!user) {
            res.status(400).json(`User doesn't exist!`)
            return
        }
        let question = await Question.findById({_id: req.body.question_id})
        if (!question) {
            res.status(400).json(`Question doesn't exist!`)
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
            res.status(404).send(error.message)

        }else{
            //call the update answer function in the service and pass the data from the request
            const answer = await answerServices.updateAnswer(id, data)  
            res.send(answer)
        }
        
    }


    //delete a answer
    deleteAnswer = async (req: Request, res: Response) => {
        const id = req.params.id
        await answerServices.deleteAnswer(id)
        res.send('answer deleted')
    }

}

//export class
export const AnswerController = new answerController()