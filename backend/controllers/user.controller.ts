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
            res.status(404).json({
                success: false,
                msg: error.message
            })

        }else{
            //call the create user function in the service and pass the data from the request
            const result = await userServices.createUser(value)
            res.status(201).json(result)          
        }
        
    }

    //get all users
    getUsers = async (req: Request, res: Response) => {
        const {limit, offset} = req.query
        
        const result = await userServices.getUsers(limit, offset)
        res.json(result)
    }


    //get a single user
    getAUser = async (req: Request, res: Response) => {
        //get id from the parameter
        const id = req.params.id
        const result = await userServices.getUser(id)
        res.json(result)
    }

    //update user
    updateUser = async (req: Request, res: Response) => {
        const id = req.params.id
        const result = await userServices.updateUser(id, req.body)  
        res.json(result)
    }


    //delete a user
    deleteUser = async (req: Request, res: Response) => {
        const id = req.params.id
        const result = await userServices.deleteUser(id)
        res.json(result)
    }

}

//export class
export const UserController = new userController()