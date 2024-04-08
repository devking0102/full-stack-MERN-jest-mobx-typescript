import { func } from 'joi'
import { Answer } from '../models/Answer'
export class answerService {
    //create a answer
    async createAnswer(data: any) {
        try {
            const newAnswer = await Answer.create(data)
            return {
                success: true,
                data: newAnswer
            }

        } catch (error) {
            return {
                success: false,
                msg: 'Answer created failed!'
            }
        }
    }

    //get user answers
    async getAnswers(data: any, limit: any, offset: any) {
        try {
            const answers = await Answer.find({user: data})
                .limit(limit)
                .skip(offset)
                .exec()
            const count = await Answer.find({user: data}).countDocuments().exec()

            return {
                success: true,
                data: {
                    answers: answers,
                    totalCount: count,
                    totalPage: Math.ceil(count / limit)
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    //get a single answer
    async getAnswer(id: string) {
      
        try {
            const answer = await Answer.findById({_id:id})
            if (!answer) {
                return {
                    success: false,
                    msg: 'answer not available'
                }

            }
            return {
                success: true,
                data: answer
            }

        } catch (error) {
            console.log(error)
        }
    }

    //update a answer
    async updateAnswer(id: string, data: any) {
        try {
                //pass the id of the object you want to update
                //data is for the new body you are updating the old one with
                //new:true, so the dats being returned, is the update one
                const answer = await Answer.findByIdAndUpdate({_id:id}, data)
                if(!answer){
                    return {
                        success: false,
                        msg: "Answer update is not available!"
                    }
                }
                return {
                    success: true,
                    data: answer
                }
        } catch (error) {
            return {
                success: false,
                msg: "Answer update is failed!"
            }
        }
    }

    //delete a answer by using the find by id and delete 
    async deleteAnswer(id: string, user: any) {
        try {
            const answer = await Answer.findByIdAndDelete(id)
            if (!answer) {
                return {
                    success: false,
                    msg: "Answer delete is not available!"
                }
            } else {
                const count = await Answer.find({user: user}).countDocuments()
                return {
                    success: true,
                    data: count
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

//export the class
export const answerServices = new answerService()