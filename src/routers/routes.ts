import express from 'express'

import authentication from './authenticationRoutes'
import users from './usersRoutes'

const router = express.Router()

export default (): express.Router => {
    authentication(router)
    users(router)

    return router
}