import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Users = ({ users }) => {
    return (
        <>
            <h2>Users</h2>
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>Username</Col>
                        <Col>Blogs created</Col>
                    </Row>
                </ListGroup.Item>
                {users.map((e, i) => (
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <Link to={e.id}>{e.username}</Link>
                            </Col>
                            <Col>
                                {e.Blog.length}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}

export default Users
