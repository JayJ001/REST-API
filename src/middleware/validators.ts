import express from 'express'
import { get, merge } from 'lodash'

import { getUserBySessionToken } from '../database/schema'

export const isOwner = async(req: express.Request, res: express.Response, next: express.NextFunction) => { // prevent current loggedin user from accessing other user id
    try{
        const {id} = req.params
        const currentUserId = get(req, 'identity._id') as string
        if(!currentUserId) {
            return res.sendStatus(403)
        }

        if(currentUserId.toString() !== id){
            return res.sendStatus(403)
        }

        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => { // check if user is logged in
    try {
        const sessionToken = req.cookies['USER-COOKIE']
        if (!sessionToken) {
            return res.sendStatus(403)
        }

        const loggedUser = await getUserBySessionToken(sessionToken)
        if (!loggedUser) {
            return res.sendStatus(403)
        }

        merge(req, {identity: loggedUser})

        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}