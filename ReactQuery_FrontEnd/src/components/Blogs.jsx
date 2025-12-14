import { useNavigate, } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'


const Blogs = ({ blogs, },) => {
    blogs.sort((a, b,) => b.likes - a.likes,)
    const navigate = useNavigate()

    return (
        <>
            <h2>Blogs</h2>
            <Nav variant='underline' onSelect={(eventKey,) => { navigate(eventKey,) }} style={{ flexDirection: 'column', alignItems: 'start', }}>
                {blogs.map((blog, index,) => (
                    <Nav.Item key={index}>
                        <Nav.Link eventKey={`/blogs/${blog.id}`}>{blog.title}</Nav.Link>
                    </Nav.Item>
                ),)}
            </Nav>
        </>
    )
}

export default Blogs
