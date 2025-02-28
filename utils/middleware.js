import logger from './logger.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import config from './config.js'

const requestLogger = (request, response, next) => {
    logger.info(request.method)
    logger.info(request.path)
    logger.info(request.body)
    logger.info('---')
    next()
}

const getToken = (request, response, next) => {
    const authorization = request.get('Authorization')
    request.token = (authorization && authorization.startsWith('Bearer ')) ? authorization.replace('Bearer ', '') : ""
    request.decodedToken = request.token ? jwt.verify(request.token, config.JWT_SECRET) : {}
    next()
}

const getUser = async (request, response, next) => {
    request.user = request.decodedToken.id ? await User.findOne({ _id: request.decodedToken.id }) : null
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    }
    // else {
    //     return response.status(400).json({ error: error })
    // }
    next(error)
}


export { requestLogger, unknownEndpoint, errorHandler, getToken, getUser }
