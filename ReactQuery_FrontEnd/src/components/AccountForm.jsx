import { useNavigate, } from 'react-router-dom'
import { setNotification, clearNotification, } from '../contexts/notification'
import { setUser, clearUser, } from '../contexts/user'
import { useContext, } from 'react'
import AccountService from '../services/accountService'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import notificationContext from '../contexts/notification'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import useInput from '../hooks/useInput'
import userContext from '../contexts/user'


const AccountForm = () => {
    const [notification, notificationDispatch,] = useContext(notificationContext,)
    const [user, userDispatch,] = useContext(userContext,)
    const navigate = useNavigate()
    const password = useInput('password', 'password',)
    const username = useInput('text', 'admin',)

    const loginHandler = (event,) => {
        event.preventDefault()
        AccountService.login(username.values.value, password.values.value,)
            .then((newUser,) => {
                userDispatch(setUser(newUser,),)
                window.localStorage.setItem('user', JSON.stringify(newUser,),)
                if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut,)
                const timeOut = setTimeout(() => {
                    notificationDispatch(clearNotification(),)
                }, 5000,)
                notificationDispatch(
                    setNotification({
                        message: 'login successful',
                        lastTimeOut: timeOut,
                    },),
                )
                username.methods.reset()
                password.methods.reset()
            },)
            .catch((_err,) => {
                if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut,)
                const timeOut = setTimeout(() => {
                    notificationDispatch(clearNotification(),)
                }, 5000,)
                notificationDispatch(
                    setNotification({
                        error: 'login unsuccessful',
                        lastTimeOut: timeOut,
                    },),
                )
            },)
    }

    const logoutHandler = () => {
        userDispatch(clearUser(),)
        window.localStorage.removeItem('user',)
        if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut,)
        const timeOut = setTimeout(() => {
            notificationDispatch(clearNotification(),)
        }, 5000,)
        notificationDispatch(
            setNotification({
                message: 'logout successful',
                lastTimeOut: timeOut,
            },),
        )
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
            <Navbar style={{ justifyContent: 'center', flexWrap: 'wrap', }}>
                <Navbar.Brand>Mini Blog List App</Navbar.Brand>
                <Nav className='me-0 me-sm-auto' variant='underline' onSelect={(eventKey,) => { navigate(eventKey,) }} defaultActiveKey='/'>
                    <Nav.Item>
                        <Nav.Link eventKey='/' as='div'>
                            Blogs
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey='/users' as='div'>
                            Users
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Stack direction='horizontal' gap={2} style={{ justifyContent: 'end', }}>
                    <Navbar.Text>
                        {user.username} is logged in
                    </Navbar.Text>
                    <Button variant='danger' onClick={logoutHandler}>logout</Button>
                </Stack>
            </Navbar>
        )
}

export default AccountForm
