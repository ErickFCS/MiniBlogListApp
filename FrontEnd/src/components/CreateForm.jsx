import { useState, } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Stack from 'react-bootstrap/esm/Stack'

const CreateForm = ({ createHandler, },) => {
    const [title, setTitle,] = useState('',)
    const [author, setAuthor,] = useState('',)
    const [url, setUrl,] = useState('',)

    const onSubmitHandler = (event,) => {
        event.preventDefault()
        createHandler(title, author, url,)
            .then(() => {
                setTitle('',)
                event.target.title.value = ''
                setAuthor('',)
                event.target.author.value = ''
                setUrl('',)
                event.target.url.value = ''
            },)
            .catch(() => { },)
    }

    return (
        <Stack style={{ alignItems: 'center', }}>
            <Card style={{ width: '90%', maxWidth: 400, }}>
                <Card.Body>
                    <Card.Title>
                        <h2 style={{ margin: 0, textAlign: 'center', marginTop: 24, marginBottom: 40, }}>Create new</h2>
                    </Card.Title>
                    <Form onSubmit={onSubmitHandler}>
                        <Stack gap={3}>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Text>title:</InputGroup.Text>
                                    <Form.Control onChange={({ target, },) => { setTitle(target.value,) }} placeholder='title' type='text' name='title' />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Text>author:</InputGroup.Text>
                                    <Form.Control onChange={({ target, },) => { setAuthor(target.value,) }} placeholder='author' type='text' name='author' />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Text>url:</InputGroup.Text>
                                    <Form.Control onChange={({ target, },) => { setUrl(target.value,) }} placeholder='url' type='text' name='url' />
                                </InputGroup>
                            </Form.Group>
                            <Button variant='success' type='submit'>create</Button>
                        </Stack>
                    </Form>
                </Card.Body>
            </Card>
        </Stack>
    )
}

export default CreateForm