import { Router } from 'express'
import Blog from '../models/blog.js'

const BlogsRouter = Router()

BlogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('User', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

BlogsRouter.post('/', async (request, response) => {
    if (!request.decodedToken.id) return response.status(401).json({ error: 'token invalid' })
    if (!request.user) return response.status(401).json({ error: 'no valid user' })
    const { title, url } = request.body
    const author = request.user.username
    let blog = new Blog({ title, author, url })
    blog.User = request.user.id
    const result = await blog.save()
    request.user.Blog.push(result.id)
    await request.user.save()
    response.status(201).json(result)
})

BlogsRouter.post('/:id/comments', async (request, response) => {
    if (!request.decodedToken.id) return response.status(401).json({ error: 'token invalid' })
    if (!request.user) return response.status(401).json({ error: 'no valid user' })
    const blog = await Blog.findOne({ _id: request.params.id })
    if (!blog) return response.status(404).json({ error: 'no valid blog' })
    const { comment } = request.body
    if (!comment) return response.status(400).json({ error: 'no comment value found' })
    blog.comments.push(comment)
    const result = await blog.save()
    response.status(200).json(result)
})

BlogsRouter.delete('/:id', async (request, response) => {
    if (!request.decodedToken.id) return response.status(401).json({ error: 'token invalid' })
    if (!request.user) return response.status(401).json({ error: 'no valid user' })
    const blog = await Blog.findOne({ _id: request.params.id })
    if (!blog) return response.status(404).json({ error: 'no valid blog' })
    if (blog.User.toString() !== request.decodedToken.id) return response.status(401).json({ error: 'You dont have permission to delete this blog' })
    await Blog.deleteOne({ _id: request.params.id })
    request.user.Blog = request.user.Blog.filter((e) => (e.toString !== blog.id))
    await request.user.save()
    response.status(204).end()
})

BlogsRouter.put('/:id', async (request, response) => {
    if (!request.decodedToken.id) return response.status(401).json({ error: 'token invalid' })
    if (!request.user) return response.status(401).json({ error: 'no valid user' })
    const blog = await Blog.findOne({ _id: request.params.id })
    if (!blog) return response.status(404).json({ error: 'no valid blog' })
    const { title, author, url, likes } = request.body
    if (likes) {
        blog.likes = blog.likes + 1
    } else {
        if (blog.User.toString() !== request.decodedToken.id) return response.status(401).json({ error: 'You dont have permission to edit this blog' })
        blog.title = title || blog.title
        blog.author = author || blog.author
        blog.url = url || blog.url
    }
    const result = await blog.save()
    response.status(200).json(result)
})

export default BlogsRouter