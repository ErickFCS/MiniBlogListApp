import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Stack from 'react-bootstrap/esm/Stack'
import useInput from '../hooks/useInput'

const CreateForm = ({ createHandler }) => {
    const title = useInput('text')
    const author = useInput('text')
    const url = useInput('text')

    const onSubmitHandler = (event) => {
        event.preventDefault()
        createHandler(title.values.value, author.values.value, url.values.value)
            .then(() => {
                title.methods.reset()
                author.methods.reset()
                url.methods.reset()
            })
            .catch((err) => { })
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
                                    <Form.Control {...title.values} placeholder='author' />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Text>author:</InputGroup.Text>
                                    <Form.Control {...author.values} placeholder='title' />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Text>url:</InputGroup.Text>
                                    <Form.Control {...url.values} placeholder='url' />
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
