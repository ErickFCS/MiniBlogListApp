import { useState, } from 'react'
import AccountService from '../services/accountService'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Navbar from 'react-bootstrap/Navbar'
import PropTypes from 'prop-types'
import Stack from 'react-bootstrap/Stack'


const AccountForm = ({ user, setUser, setError, setMessage, },) => {
    const [username, setUsername,] = useState('',)
    const [password, setPassword,] = useState('',)

    const loginHandler = (event,) => {
        event.preventDefault()
        AccountService
            .login(username, password,)
            .then((newUser,) => {
                setUser(newUser,)
                window.localStorage.setItem('user', JSON.stringify(newUser,),)
                setMessage('login successful',)
                setUsername('',)
                setPassword('',)
            },)
            .catch(() => {
                setError('login unsuccessful',)
            },)
    }

    const logoutHandler = () => {
        setUser({},)
        window.localStorage.removeItem('user',)
        setMessage('logout successful',)
    }

    if (!user.name) return (
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
                                    <Form.Control onChange={({ target, },) => { setUsername(target.value,) }} name='username' type='text' />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Text>Password:</InputGroup.Text>
                                    <Form.Control onChange={({ target, },) => { setPassword(target.value,) }} name='password' type='password' />
                                </InputGroup>
                            </Form.Group>
                            <Button variant='success' type='submit'>login</Button>
                        </Stack>
                    </Form>
                </Stack>
            </Card.Body>
        </Card>
    )
    else return (
        <Navbar>
            <Navbar.Brand>Mini Blog List App</Navbar.Brand>
            <Stack direction='horizontal' gap={2} style={{ flexGrow: 1, justifyContent: 'end', }}>
                <Navbar.Text>
                    {user.username} is logged in
                </Navbar.Text>
                <Button variant='danger' onClick={logoutHandler}>logout</Button>
            </Stack>
        </Navbar>
    )
}

AccountForm.propType = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
}

export default AccountForm