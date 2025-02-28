const dummy = () => true

const totalLikes = (blogs) => (
    blogs.reduce((sum, blog) => (sum + blog.likes), 0)
)

const favoriteBlog = (blogs) => (
    blogs.reduce((p, a) => (p.likes > a.likes ? p : a))
)

const mostBlogs = (blogs) => {
    let authors = {}
    blogs.forEach((e) => {
        if (!authors[e.author]) {
            authors[e.author] = 1
        } else {
            authors[e.author] += 1
        }
    })
    let res = Object.keys(authors).reduce((p, a) => (authors[p] > authors[a] ? p : a))
    return {
        author: res,
        blogs: authors[res]
    }
}

const mostLikes = (blogs) => {
    let authors = {}
    blogs.forEach((e) => {
        if (!authors[e.author]) {
            authors[e.author] = e.likes
        } else {
            authors[e.author] += e.likes
        }
    })
    let res = Object.keys(authors).reduce((p, a) => (authors[p] > authors[a] ? p : a))
    return {
        author: res,
        likes: authors[res]
    }
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }