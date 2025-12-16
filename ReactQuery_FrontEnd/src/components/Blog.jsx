import { setNotification, clearNotification, } from '../contexts/notification'
import { useContext, } from 'react'
import { useQueryClient, useMutation, } from '@tanstack/react-query'
import BlogsService from '../services/blogsService'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import notificationContext from '../contexts/notification'
import Stack from 'react-bootstrap/esm/Stack'
import Table from 'react-bootstrap/Table'
import useInput from '../hooks/useInput'
import userContext from '../contexts/user'

const Blog = ({ blog, },) => {
    const [notification, notificationDispatch,] = useContext(notificationContext,)
    const [user, _userDispatch,] = useContext(userContext,)
    const comment = useInput('text',)

    const queryClient = useQueryClient()
    const blogsLikeMutation = useMutation({
        mutationKey: ['blogs',],
        mutationFn: BlogsService.giveLike,
        onSuccess: (res,) => {
            let blogs = queryClient.getQueryData(['blogs',],)
            queryClient.setQueryData(
                ['blogs',],
                blogs.map((e,) => (e.id !== res.id ? e : { ...e, likes: e.likes + 1, }),),
            )
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut,)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification(),)
            }, 5000,)
            notificationDispatch(setNotification({ message: 'Liked', lastTimeOut: timeOut, },),)
        },
        onError: (err,) => {
            console.error(err,)
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut,)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification(),)
            }, 5000,)
            notificationDispatch(
                setNotification({
                    error: 'Unable to like',
                    lastTimeOut: timeOut,
                },),
            )
        },
    },)
    const blogsCommentMutation = useMutation({
        mutationKey: ['blogs',],
        mutationFn: BlogsService.commentBlog,
        onSuccess: (res,) => {
            let blogs = queryClient.getQueryData(['blogs',],)
            queryClient.setQueryData(
                ['blogs',],
                blogs.map((e,) => (e.id !== res.id ? e : res),),
            )
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut,)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification(),)
            }, 5000,)
            notificationDispatch(setNotification({ message: 'commented', lastTimeOut: timeOut, },),)
        },
        onError: (err,) => {
            console.error(err,)
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut,)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification(),)
            }, 5000,)
            notificationDispatch(
                setNotification({
                    error: 'Unable to comment',
                    lastTimeOut: timeOut,
                },),
            )
        },
    },)
    const blogsDeleteMutation = useMutation({
        mutationKey: ['blogs',],
        mutationFn: BlogsService.deleteBlog,
        onSuccess: (res,) => {
            const newBlogs = queryClient.getQueryData(['blogs',],).filter((e,) => e.id !== res.id,)
            queryClient.setQueryData(['blogs',], newBlogs,)
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut,)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification(),)
            }, 5000,)
            notificationDispatch(
                setNotification({
                    message: `${res.title} removed`,
                    lastTimeOut: timeOut,
                },),
            )
        },
        onError: (err,) => {
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut,)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification(),)
            }, 5000,)
            notificationDispatch(
                setNotification({
                    error: `unable to remove ${err.title}`,
                    lastTimeOut: timeOut,
                },),
            )
        },
    },)

    const likesHandler = () => {
        blogsLikeMutation.mutate({ blog, user, },)
    }

    const removeHandler = () => {
        if (!window.confirm(`Are you sure yo want to remove ${blog.title}?`,)) return
        blogsDeleteMutation.mutate({ blog, user, },)
    }

    const commentHandler = (event,) => {
        event.preventDefault()
        blogsCommentMutation.mutate({
            blog,
            user,
            comment: comment.values.value,
        },)
        comment.methods.reset()
    }
    return (
        <>
            <Stack direction='horizontal'>
                <h2 style={{ margin: 0, flexGrow: 1, }}>{blog.title}</h2>
                {user.id === blog.User.id &&
                    <Button variant='danger' onClick={() => { removeHandler(blog,) }}>Delete</Button>
                }
            </Stack>
            <Table style={{ margin: 0, height: '100%', }}>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Author:</td>
                        <td>{blog.author}</td>
                    </tr>
                    <tr>
                        <td>Url:</td>
                        <td>{blog.url}</td>
                    </tr>
                    <tr>
                        <td>
                            <Stack direction='horizontal' style={{ alignItems: 'center', height: '100%', }}>
                                Total likes:
                            </Stack>
                        </td>
                        <td>
                            <Stack direction='horizontal' style={{ justifyContent: 'space-between', }}>
                                {blog.likes}
                                <Button variant='warning' onClick={() => { likesHandler(blog,) }}>Give like</Button>
                            </Stack>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <h3>Comments</h3>
            <Form onSubmit={commentHandler}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control {...comment.values} placeholder='comment here' />
                        <Button type='submit'>comment</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
            <ul>
                {blog.comments?.map((e, i,) => (
                    <li key={i}>{e}</li>
                ),)}
            </ul>
        </>
    )
}

export default Blog
