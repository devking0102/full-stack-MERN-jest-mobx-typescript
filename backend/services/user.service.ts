import { User } from '../models/User'
export class userService {
    //create a user
    async createUser(data: any) {
        try {
            const newUser = await User.create(data)
            return {
                success: true,
                data: newUser
            }

        } catch (error) {
            return {
                success: false,
                msg: 'Error occured!'
            }
        }
    }

    //get all users
    async getUsers(limit: any, offset: any) {
        try {
            const users = await User.find().limit(limit).skip(offset).exec()
            const count = await User.countDocuments()
            let result = {
                success: true,
                data: {
                    users: users,
                    totalCount: count,
                    totalPage: Math.ceil(count / limit)
                }
            }
            return result
        } catch (error) {
            return {
                success: false,
                msg: 'Error occured!'
            }
        }
    }

    //get a single user
    async getUser(id: string) {
      
        try {
            const user = await User.findById({_id:id})
            if (!user) {
                return {
                    success: false,
                    msg: 'user not available'
                }
            }
            return {
                success: true,
                data: user
            }

        } catch (error) {
            return {
                success: false,
                msg: 'Error occured!'
            }
        }
    }

    //update a user
    async updateUser(id: string, data: any) {
        try {
                //pass the id of the object you want to update
                //data is for the new body you are updating the old one with
                //new:true, so the dats being returned, is the update one
                const user = await User.findByIdAndUpdate({_id:id}, data, {new: true})                
                if(!user){
                    return {
                        success: false,
                        msg: 'User not available!'
                    }
                }
                return {
                    success: true,
                    data: user
                }          
        } catch (error) {
            return {
                success: false,
                msg: 'Error occured!'
            }
        }
    }

    //delete a user by using the find by id and delete 
    async deleteUser(id: string) {
        try {
            const user = await User.findByIdAndDelete(id)
            if (!user) {
                return {
                    success: false,
                    msg: 'User not available!'
                }
            }
            const count = await User.countDocuments()
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
export const userServices = new userService()