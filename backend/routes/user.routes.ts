import express from "express";
import { UserController } from '../controllers/user.controller'

//initiating the router
const router = express.Router()

//add user route
router.post('/',UserController.addUser)

//get users
router.get('/', UserController.getUsers)

//get single user
router.get('/:id', UserController.getAUser)

//update a user
router.put('/:id', UserController.updateUser)

//delete a user
router.delete('/:id', UserController.deleteUser)

export default router