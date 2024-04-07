import express from "express";
import { QuestionController } from '../controllers/question.controller'

//initiating the router
const router = express.Router()

//add question route
router.post('/',QuestionController.addQuestion)

//get questions
router.get('/', QuestionController.getQuestions)

//get all questions
router.get('/all', QuestionController.getAllQuestions)

//get single question
router.get('/:id', QuestionController.getAQuestion)

//update a question
router.put('/:id', QuestionController.updateQuestion)

//delete a question
router.delete('/:id', QuestionController.deleteQuestion)

export default router