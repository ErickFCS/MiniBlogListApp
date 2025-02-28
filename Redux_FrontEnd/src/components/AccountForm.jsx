import { clearUser, setUser } from '../reducers/user'
import { newNotification } from '../reducers/notifications'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AccountService from '../services/accountService'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Stack from 'react-bootstrap/Stack'
import useInput from '../hooks/useInput'

const AccountForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const password = useInput('password')
    const user = useSelector((state) => state.user)
    const username = useInput('text')

    const loginHandler = (event) => {
        event.preventDefault()
        AccountService.login(username.values.value, password.values.value)
            .then((newUser) => {
                dispatch(setUser(newUser))
                window.localStorage.setItem('user', JSON.stringify(newUser))
                dispatch(newNotification('login successful', 5))
                username.methods.reset()
                password.methods.reset()
            })
            .catch((err) => {
                dispatch(newNotification('login unsuccessful', 5, true))
            })
    }

    const logoutHandler = () => {
        dispatch(clearUser())
        window.localStorage.removeItem('user')
        dispatch(newNotification('logout successful', 5))
    }

    if (!user.name)
        return (
            <Card style={{ width: '90%', maxWidth: 400, alignSelf: 'center', }}>
                <Card.Body>
                    <Stack gap={2}>
                        <Card.Title style={{ marginTop: 24, marginBottom: 40, }}>
                            <h2 style={{ margin: 0, textAlign: 'center', }}>Log in</h2>
                        </Card.Title>
                        <Form onSubmit={loginHandler}>
                            <Stack gap={3}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Text>Username:</InputGroup.Text>
                                        <Form.Control {...username.values} placeholder='username' />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Text>Password:</InputGroup.Text>
                                        <Form.Control {...password.values} placeholder='password' />
                                    </InputGroup>
                                </Form.Group>
                                <Button variant='success' type='submit'>login</Button>
                            </Stack>
                        </Form>
                    </Stack>
                </Card.Body>
            </Card>
        )
    else
        return (
            <Navbar>
                <Navbar.Brand>Mini Blog List App</Navbar.Brand>
                <Nav variant="underline" onSelect={(eventKey) => { navigate(eventKey) }} defaultActiveKey='/'>
                    <Nav.Item>
                        <Nav.Link eventKey="/" as='div'>
                            Blogs
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/users" as='div'>
                            Users
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Stack direction='horizontal' gap={2} style={{ flexGrow: 1, justifyContent: 'end', }}>
                    <Navbar.Text>
                        {user.username} is logged in
                    </Navbar.Text>
                    <Button variant='danger' onClick={logoutHandler}>logout</Button>
                </Stack>
            </Navbar>
        )
}

export default AccountForm
