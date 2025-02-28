import Blog from './Blog'
import BlogsService from '../services/blogsService'

const Blogs = ({ blogs, user, setBlogs, setMessage, setError, },) => {
    blogs.sort((a, b,) => b.likes - a.likes,)
    const likesHandler = (blog,) => {
        BlogsService
            .giveLike(blog, user,)
            .then(() => {
                let newBlogs = [...blogs,]
                newBlogs[blog.index].likes = newBlogs[blog.index].likes + 1
                setBlogs(newBlogs,)
                setMessage('Liked',)
            },).catch((err,) => {
                console.error(err,)
                setError('Unable to like',)
                return
            },)
    }
    const removeHandler = (blog,) => {
        if (!window.confirm(`Are you sure yo want to remove ${blog.title}?`,)) return
        BlogsService
            .deleteBlog(blog, user,)
            .then(() => {
                let newBlogs = blogs.filter((e,) => e.id !== blog.id,)
                setBlogs(newBlogs,)
                setMessage(`${blog.title} removed`,)
            },)
            .catch(() => {
                setError(`unable to remove ${blog.title}`,)
            },)
    }
    return (
        <>
            <h2>Blogs</h2>
            {blogs.map((blog, index,) => (
                <Blog
                    key={index}
                    blog={{ ...blog, index, }}
                    likesHandler={likesHandler}
                    removeHandler={removeHandler}
                    user={user} />
            ),)}
        </>
    )
}

export default Blogs