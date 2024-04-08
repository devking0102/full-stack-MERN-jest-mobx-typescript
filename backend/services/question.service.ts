import { Question } from '../models/Question'
export class questionService {
    //create a question
    async createQuestion(data: any) {
        try {
            const newQuestion = await Question.create(data)
            return {
                success: true,
                data: newQuestion
            }

        } catch (error) {
            return {
                success: false,
                msg: 'Question is created unsuccessfully!'
            }
        }
    }

    //get paginate questions
    async getQuestions(limit: any, offset: any) {
        try {
            const questions = await Question.find()
                .limit(limit)
                .skip(offset)
                .exec()
            const count = await Question.find().countDocuments()

            return {
                success: true,
                data: {
                    questions: questions,
                    totalCount: count,
                    totalPage: Math.ceil(count / limit)
                }
            }

        } catch (error) {
            return {
                success: false,
                msg: 'Error occured!'
            }
        }
    }

    //get all questions
    async getAllQuestions() {
        try {
            const questions = await Question.find({})
            return {
                success: true,
                data: questions
            }

        } catch (error) {
            return {
                success: false,
                msg: 'Error occured!'
            }
        }
    }

    //get a single question
    async getQuestion(id: string) {
      
        try {
            const question = await Question.findById({_id:id})
            if (!question) {
                return {
                    success: false,
                    msg: 'question not available'
                }
            }
            return {
                success: true,
                data: question
            }

        } catch (error) {
            return {
                success: false,
                msg: 'Error occured!'
            }
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
                    return {
                        success: false,
                        msg: 'Question not available!'
                    }
                }
                return {
                    success: true,
                    data: question
                }
        } catch (error) {
            return {
                success: false,
                msg: 'Error occured!'
            }
        }
    }

    //delete a question by using the find by id and delete 
    async deleteQuestion(id: string) {
        try {
            const question = await Question.findByIdAndDelete(id)
            if (!question) {
                return {
                    success: false,
                    msg: 'Question not available!'
                }
            }
            const count = await Question.countDocuments()
            return {
                success: true,
                data: count
            }
        } catch (error) {
            return {
                success: false,
                msg: 'Error occured!'
            }
        }
    }
}

//export the class
export const questionServices = new questionService()