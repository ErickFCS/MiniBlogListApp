import { useState, } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/esm/Stack'
import Table from 'react-bootstrap/Table'

const Blog = ({ blog, likesHandler, removeHandler, user, },) => {
    const [isVisible, setIsVisible,] = useState(false,)
    const [buttonText, setButtonText,] = useState('Show',)
    const visibleWhenVisible = { display: isVisible ? '' : 'none', }
    const toggleVisibility = () => {
        let buttonText = isVisible ? 'Show' : 'Hide'
        setButtonText(buttonText,)
        setIsVisible(!isVisible,)
    }
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {blog.title}<Button onClick={toggleVisibility}>{buttonText}</Button>
                </Card.Title>
                <Table>
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
                        <tr style={visibleWhenVisible}>
                            <td>Url:</td>
                            <td>{blog.url}</td>
                        </tr>
                        <tr style={visibleWhenVisible}>
                            <td>Total likes:</td>
                            <td>
                                <Stack direction='horizontal' style={{ justifyContent: 'space-between', }}>
                                    {blog.likes}
                                    <Button variant='warning' onClick={() => { likesHandler(blog,) }}>Give like</Button>
                                </Stack>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                {user.id === blog.User.id &&
                    <Stack style={{ alignItems: 'end', ...visibleWhenVisible, }}>
                        <Button variant='danger' onClick={() => { removeHandler(blog,) }}>Delete</Button>
                    </Stack>
                }
            </Card.Body>
        </Card >
    )
}

export default Blog