import { addComment, giveLike, removeBlog } from '../reducers/blogs'
import { newNotification } from '../reducers/notifications'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import Stack from 'react-bootstrap/esm/Stack'
import Table from 'react-bootstrap/Table'
import useInput from '../hooks/useInput'

const Blog = ({ blog }) => {
    if (!blog) return null
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const comment = useInput('text')

    const likesHandler = () => {
        dispatch(giveLike(blog, user))
            .then((res) => {
                dispatch(newNotification('Liked', 5))
            })
            .catch((err) => {
                dispatch(newNotification('Unable to like', 5, true))
            })
    }
    const removeHandler = () => {
        if (!window.confirm(`Are you sure yo want to remove ${blog.title}?`)) return
        dispatch(removeBlog(blog, user))
            .then((res) => {
                dispatch(newNotification(`${blog.title} removed`, 5))
            })
            .catch((err) => {
                dispatch(newNotification(`unable to remove ${blog.title}`, 5, true))
            })
        navigate('/')
    }
    const commentHandler = (event) => {
        event.preventDefault()
        dispatch(addComment(blog, user, comment.values.value))
        comment.methods.reset()
    }
    return (
        <>
            <Stack direction='horizontal'>
                <h2 style={{ margin: 0, flexGrow: 1 }}>{blog.title}</h2>
                {user.id === blog.User.id &&
                    <Button variant='danger' onClick={() => { removeHandler(blog,) }}>Delete</Button>
                }
            </Stack>
            <Table style={{ margin: 0, height: '100%' }}>
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
                            <Stack direction='horizontal' style={{ alignItems: 'center', height: "100%" }}>
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
                {blog.comments?.map((e, i) => (
                    <li key={i}>{e}</li>
                ))}
            </ul>
        </>
    )
}

export default Blog
