import { Routes, Route, useMatch, Navigate, } from 'react-router-dom'
import { setNotification, clearNotification, } from './contexts/notification'
import { setUser,  } from './contexts/user'
import { useContext, } from 'react'
import { useEffect, } from 'react'
import { useQuery, useQueryClient, useMutation, } from '@tanstack/react-query'
import AccountForm from './components/AccountForm'
import Blog from './components/Blog'
import BlogService from './services/blogsService'
import Blogs from './components/Blogs'
import CreateForm from './components/CreateForm'
import Message from './components/Message'
import Stack from 'react-bootstrap/Stack'
import Toggle from './components/Toggle'
import User from './components/User'
import Users from './components/Users'
import notificationContext from './contexts/notification'
import userContext from './contexts/user'
import userService from './services/userService'

const App = () => {
    const [notification, notificationDispatch,] = useContext(notificationContext,)
    const [user, userDispatch,] = useContext(userContext,)
    const matchUserId = useMatch('/users/:id',)
    const matchBlogId = useMatch('/blogs/:id',)

    useEffect(() => {
        const savedUser = JSON.parse(window.localStorage.getItem('user',),) || {}
        if (savedUser.name) userDispatch(setUser(savedUser,),)
    }, [userDispatch,],)

    const usersResult = useQuery({
        initialData: [],
        queryKey: ['users',],
        queryFn: userService.fetchAll,
        retry: 3,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
    },)
    const blogsResult = useQuery({
        initialData: [],
        queryKey: ['blogs',],
        queryFn: BlogService.getAll,
        retry: 3,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
    },)
    const queryClient = useQueryClient()
    const blogsMutation = useMutation({
        mutationKey: ['blogs',],
        mutationFn: BlogService.createBlog,
        onSuccess: (createdBlog,) => {
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut,)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification(),)
            }, 5000,)
            notificationDispatch(
                setNotification({
                    message: 'blog creating succeed',
                    lastTimeOut: timeOut,
                },),
            )
            createdBlog.User = {
                id: user.id,
                name: user.name,
                username: user.username,
            }
            const blogs = queryClient.getQueryData(['blogs',],)
            queryClient.setQueryData(['blogs',], blogs.concat(createdBlog,),)
        },
        onError: (err,) => {
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut,)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification(),)
            }, 5000,)
            console.error(err,)
            notificationDispatch(
                setNotification({
                    error: 'blog creating failed',
                    lastTimeOut: timeOut,
                },),
            )
            return Promise.reject(err,)
        },
    },)

    const createHandler = (title, author, url,) =>
        blogsMutation.mutateAsync({ blog: { title, author, url, }, user, },)

    if (blogsResult.isFetching) return <div>...Loading</div>
    if (blogsResult.error) return <div>Unable to reach server</div>
    const blogs = blogsResult.data
    const users = usersResult.data
    const targetUser = matchUserId ? users.find((e,) => e.id === matchUserId.params.id,) : null
    const targetBlog = matchBlogId ? blogs.find((e,) => e.id === matchBlogId.params.id,) : null
    return (
        <Stack gap={3} style={{ marginTop: 30, marginBottom: 30, }}>
            <Message message={notification.message} error={notification.error} />
            <AccountForm />
            {user.name && (
                <Routes>
                    <Route
                        path='/'
                        element={
                            <>
                                <Toggle
                                    showButtonText='create new blog'
                                    hideButtonText='cancel'>
                                    <CreateForm createHandler={createHandler} />
                                </Toggle>
                                <Blogs blogs={blogs} user={user} />
                            </>
                        }
                    />
                    <Route
                        path='/blogs/:id'
                        element={
                            <>
                                {targetBlog ? (
                                    <Blog blog={targetBlog} />
                                ) : (
                                    <Navigate replace to='/' />
                                )}
                            </>
                        }
                    />
                    <Route path='/users' element={<Users users={users} />} />
                    <Route
                        path='/users/:id'
                        element={
                            <>
                                {targetUser ? (
                                    <User user={targetUser} />
                                ) : (
                                    <Navigate replace to='/' />
                                )}
                            </>
                        }
                    />
                </Routes>
            )}
        </Stack>
    )
}

export default App
