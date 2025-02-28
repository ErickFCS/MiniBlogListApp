import { Router } from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'

const UsersRouter = Router()

UsersRouter.get('/', async (request, response) => {
    const users = await User.find({}, { passwordHash: 0 }).populate('Blog', { url: 1, title: 1, author: 1, id: 1 })
    response.json(users)
})

UsersRouter.post('/', async (request, response, next) => {
    const { username, password, name } = request.body
    if (!/^.{3,}$/.test(password)) {
        next({ name: 'ValidationError', message: 'password must be at least 3 characters long' })
        return
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({ username, passwordHash, name })
    let savedUser = await newUser.save()
    response.status(201).json({
        id: savedUser.id,
        name: savedUser.name,
        username: savedUser.username
    })
})

UsersRouter.put('/:id', (request, response) => {

})

UsersRouter.delete('/:id', (request, response) => {

})

export default UsersRouter