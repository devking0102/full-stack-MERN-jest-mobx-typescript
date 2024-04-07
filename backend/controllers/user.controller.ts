import { userServices } from '../services/user.service'
import { Request, Response } from 'express'
import {UserschemaValidate} from '../models/User'

class userController {
    //add user controller
    addUser = async (req: Request, res: Response) => {
        //data to be saved in database
        const data = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            birth: req.body.birth
        }
        //validating the request
        const {error, value} = UserschemaValidate.validate(data)

        if(error){
            res.send(error.message)

        }else{
            //call the create user function in the service and pass the data from the request
            const user = await userServices.createUser(value)
            res.status(201).send(user)          
        }
        
    }

    //get all users
    getUsers = async (req: Request, res: Response) => {
        const {limit, offset} = req.query
        
        const result = await userServices.getUsers(limit, offset)
        res.send(result)
    }


    //get a single user
    getAUser = async (req: Request, res: Response) => {
        //get id from the parameter
        const id = req.params.id
        const user = await userServices.getUser(id)
        res.send(user)
    }

    //update user
    updateUser = async (req: Request, res: Response) => {
        const id = req.params.id
        const user = await userServices.updateUser(id, req.body)  
        res.send(user)
    }


    //delete a user
    deleteUser = async (req: Request, res: Response) => {
        const id = req.params.id
        await userServices.deleteUser(id)
        res.send('user deleted')
    }

}

//export class
export const UserController = new userController()