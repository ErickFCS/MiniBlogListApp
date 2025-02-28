import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'express-async-errors'
import logger from './utils/logger.js'
import config from './utils/config.js'
import BlogsRouter from './controllers/blogs.js'
import UsersRouter from './controllers/users.js'
import LoginRouter from './controllers/login.js'
import TestRouter from './controllers/tests.js'
import { requestLogger, unknownEndpoint, errorHandler, getToken, getUser } from './utils/middleware.js'

const app = express()
mongoose
    .connect(config.URI)
    .then(() => {
        logger.info("connection to mongodb successed")
    })
    .catch((error) => {
        logger.error("connection to mongodb failed", error)
    })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(cors())
app.use(express.static('dist'));
app.use(express.json())
app.use(requestLogger)
app.use(getToken)

app.use("/api/users", UsersRouter)
app.use("/api/login", LoginRouter)
app.use("/api/blogs", getUser, BlogsRouter)

if (process.env.NODE_ENV === 'test') {
    app.use('/api/tests', TestRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

export default app