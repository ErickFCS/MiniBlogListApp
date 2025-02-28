import { Router } from "express"
import User from "../models/user.js"
import bcrypt from 'bcrypt'
import config from '../utils/config.js'
import jwt from 'jsonwebtoken'

const LoginRouter = Router()

LoginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({ username })
    const passwordIsCorrect = user ? await bcrypt.compare(password, user.passwordHash) : false
    if (!passwordIsCorrect)
        return response.status(401).json({ error: "password of username incorrect" })
    const token = jwt.sign({ username: user.username, id: user.id }, config.JWT_SECRET)
    response
        .status(200)
        .json({ token, username: user.username, name: user.name, id: user.id })
})

export default LoginRouter