import { func } from 'joi'
import { Answer } from '../models/Answer'
export class answerService {
    //create a answer
    async createAnswer(data: any) {
        try {
            const newAnswer = await Answer.create(data)
            return newAnswer

        } catch (error) {
            console.log(error)
        }
    }

    //get user answers
    async getAnswers(data: any, limit: any, offset: any) {
        try {
            const answers = await Answer.find({user: data})
                .limit(limit)
                .skip(offset)
                .exec()
            const count = await Answer.find({user: data}).countDocuments()

            return {
                answers: answers,
                totalCount: count,
                totalPage: Math.ceil(count / limit)
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
                return 'answer not available'
            }
            return answer

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
                    return "answer not available"
                }
                return answer          
        } catch (error) {
            console.log(error)
        }
    }

    //delete a answer by using the find by id and delete 
    async deleteAnswer(id: string) {
        try {
            const answer = await Answer.findByIdAndDelete(id)
            if (!answer) {
                return 'answer not available'
            }
        } catch (error) {
            console.log(error)
        }
    }
}

//export the class
export const answerServices = new answerService()