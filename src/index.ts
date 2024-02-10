import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv';

import router from './routers/routes'

dotenv.config();

const app = express()

app.use(cors({ // enable cross origin resource sharing
    credentials: true,
}))

app.use(compression()) 
app.use(cookieParser())
app.use(bodyParser.json()) 

const server = http.createServer(app) // creates http server

server.listen(process.env.PORT, () => { // start http server
    console.log('Server running on port',process.env.PORT)
})

mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_URL) // connect to database
mongoose.connection.on('error', (error: Error) => console.log(error)) // listen for errors connecting

app.use('/', router())
