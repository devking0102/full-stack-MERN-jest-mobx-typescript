import express from "express";
import { AnswerController } from '../controllers/answer.controller'

//initiating the router
const router = express.Router()

//add answer route
router.post('/',AnswerController.addAnswer)

//get answers
router.get('/', AnswerController.getAnswers)

//get single answer
router.get('/:id', AnswerController.getAAnswer)

//update a answer
router.put('/:id', AnswerController.updateAnswer)

//delete a answer
router.delete('/:id', AnswerController.deleteAnswer)

export default router