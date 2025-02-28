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
    const [user, setUser,] = useState({},)
    const [message, setMessage,] = useState(null,)
    const [error, setError,] = useState(null,)

    useEffect(() => {
        BlogService.getAll().then(blogs =>
            setBlogs(blogs,),
        )
    }, [],)

    useEffect(() => {
        const savedUser = JSON.parse(window.localStorage.getItem('user',),) || {}
        if (savedUser.name) setUser(savedUser,)
    }, [],)

    useEffect(() => {
        setTimeout(() => {
            setMessage(null,)
            setError(null,)
        }, 5000,)
    }, [message, error,],)

    const createHandler = (title, author, url,) => {
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