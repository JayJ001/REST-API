import express from 'express'

import { getAllUsers, deleteUser, updateUser, updatePass } from '../controllers/usersController'
import { isAuthenticated, isOwner } from '../middleware/validators'

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers) // get all users
    router.delete('/users/delete/:id', isAuthenticated, isOwner, deleteUser) // delete currently logged in user
    router.patch('/users/changeusername/:id', isAuthenticated, isOwner, updateUser) // update username
    router.patch('/users/changepassword/:id', isAuthenticated, isOwner, updatePass) // update password
}