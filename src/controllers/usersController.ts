import express from 'express'

import { deleteUserById, getUserById, getUsers } from '../database/schema'
import { authentication, random } from '../helpers/encrypt'

export const getAllUsers = async(req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers()

        return res.status(200).json(users)
    } catch(error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const deleteUser = async(req: express.Request, res: express.Response) => {
    try{
        const{id} = req.params
        const userToDelete = await deleteUserById(id)

        return res.json(userToDelete)
    } catch(error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const updateUser = async(req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params
        const {username} = req.body

        if(!username) {
            return res.sendStatus(400)
        }

        const user = await getUserById(id)
        user.username = username
        await user.save()

        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const updatePass = async(req: express.Request, res: express.Response) => {
    try{
        const {id} = req.params 
        const {password} = req.body

        if(!password){
            return res.sendStatus(400)
        }

        const user = await getUserById(id)
        const salt = random()
        user.authentication.password = authentication(salt, password)

        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}