import { answerServices } from '../services/answer.service'
import { Request, Response } from 'express'
import {AnswerschemaValidate} from '../models/Answer'
import { User } from '../models/User'
import { Question } from '../models/Question'

class answerController {
    //add answer controller
    addAnswer = async (req: Request, res: Response) => {
        if (!req.body.user) {
            res.json({msg: `User doesn't selected!`})
            return
        }

        if (!req.body.question) {
            res.json({msg: `Question doesn't selected!`})
            return
        }

        let cuser = await User.findById({_id: req.body.user})
        if (!cuser) {
            res.json({msg: `User doesn't exist!`})
            return
        }
        let cquestion = await Question.findById({_id: req.body.question})
        if (!cquestion) {
            res.json({msg: `Question doesn't exist!`})
            return
        }
        //data to be saved in database
        const data = {
            title: req.body.title,
            content: req.body.content,
            user: cuser,
            question: cquestion,
            created_at: new Date(),
        }
        //validating the request
        const {error, value} = AnswerschemaValidate.validate(data)

        if(error){
            res.send(error.message)

        }else{
            //call the create answer function in the service and pass the data from the request
            const answer = await answerServices.createAnswer(value)
            res.status(201).send(answer)          
        }
        
    }

    //get all answers
    getAnswers = async (req: Request, res: Response) => {
        let user = await User.findById({_id: req.body.user})
        if (!user) {
            res.status(400).send({msg: `User doesn't selected!`})
        }
        const answers = await answerServices.getAnswers(user)
        res.send(answers)
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
        const answer = await answerServices.updateAnswer(id, req.body)  
        res.send(answer)
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