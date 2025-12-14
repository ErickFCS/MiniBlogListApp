import { useState, useEffect, } from 'react'
import Blogs from './components/Blogs'
import Message from './components/Message'
import Toggle from './components/Toggle'
import AccountForm from './components/AccountForm'
import CreateForm from './components/CreateForm'
import BlogService from './services/blogsService'
import Stack from 'react-bootstrap/Stack'

const App = () => {
    const [blogs, setBlogs,] = useState([],)
    const [user, setUser,] = useState(() => {
        try {
            const savedUser = window.localStorage.getItem('user',)
            return savedUser ? JSON.parse(savedUser,) : {}
        } catch (error) {
            console.error('Error parsing user from local storage:', error,)
            return {} // Return default state on error
        }
    },)
    const [message, setMessage,] = useState(null,)
    const [error, setError,] = useState(null,)

    useEffect(() => {
        let isMounted = true
        BlogService.getAll().then(blogs =>
            isMounted ? setBlogs(blogs,) : null,
        )
        return () => isMounted = false
    }, [],)

    useEffect(() => {
        let isMounted = true
        setTimeout(() => {
            if (isMounted) {
                setMessage(null,)
                setError(null,)
            }
        }, 5000,)
        return () => isMounted = false
    }, [message, error,],)

    const createHandler = async (title, author, url,) => {
        return BlogService
            .createBlog({ title, author, url, }, user,)
            .then((createdBlog,) => {
                setMessage('blog creating succeed',)
                createdBlog.User = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                }
                const newBlogs = blogs.concat(createdBlog,)
                setBlogs(newBlogs,)
            },)
            .catch((err,) => {
                setError('blog creating failed',)
                return Promise.reject(err,)
            },)
    }

    return (
        <Stack gap={3} style={{ marginTop: 30, marginBottom: 30, }}>
            <Message
                message={message}
                error={error} />
            <AccountForm
                setMessage={setMessage}
                setError={setError}
                user={user}
                setUser={setUser} />
            {user.name ?
                <>
                    <Toggle
                        showButtonText='create new blog'
                        hideButtonText='cancel'>
                        <CreateForm
                            createHandler={createHandler} />
                    </Toggle>
                    <Blogs
                        blogs={blogs}
                        user={user}
                        setBlogs={setBlogs}
                        setMessage={setMessage}
                        setError={setError} />
                </>
                : null}
        </Stack>
    )
}

export default App
