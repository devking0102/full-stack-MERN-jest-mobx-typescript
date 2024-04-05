import { Question } from '../models/Question'
export class questionService {
    //create a question
    async createQuestion(data: any) {
        try {
            const newQuestion = await Question.create(data)
            return newQuestion

        } catch (error) {
            console.log(error)
        }
    }

    //get all questions
    async getQuestions() {
        try {
            const questions = await Question.find({})
            return questions

        } catch (error) {
            console.log(error)
        }
    }

    //get a single question
    async getQuestion(id: string) {
      
        try {
            const question = await Question.findById({_id:id})
            if (!question) {
                return 'question not available'
            }
            return question

        } catch (error) {
            console.log(error)
        }
    }

    //update a question
    async updateQuestion(id: string, data: any) {
        try {
                //pass the id of the object you want to update
                //data is for the new body you are updating the old one with
                //new:true, so the dats being returned, is the update one
                const question = await Question.findByIdAndUpdate({_id:id}, data, {new: true})                
                if(!question){
                    return "question not available"
                }
                return question          
        } catch (error) {
            console.log(error)
        }
    }

    //delete a question by using the find by id and delete 
    async deleteQuestion(id: string) {
        try {
            const question = await Question.findByIdAndDelete(id)
            if (!question) {
                return 'question not available'
            }
        } catch (error) {
            console.log(error)
        }
    }
}

//export the class
export const questionServices = new questionService()