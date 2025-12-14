import { Link, } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Users = ({ users, },) => {
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
                {users.map((e, i,) => (
                    <ListGroup.Item key={`ListGroup${i}`}>
                        <Row>
                            <Col>
                                <Link to={e.id}>{e.username}</Link>
                            </Col>
                            <Col>
                                {e.Blog.length}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ),)}
            </ListGroup>
            {/* <Table>
                <tbody>
                    {users.map((e, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={e.id}>{e.username}</Link>
                            </td>
                            <td>{e.Blog.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table> */}
        </>
    )
}

export default Users
