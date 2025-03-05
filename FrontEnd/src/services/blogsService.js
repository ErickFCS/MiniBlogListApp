import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const createBlog = (blog, user) => {
    return axios
        .post(baseUrl, blog, { headers: { 'Authorization': `Bearer ${user.token}` } })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.error(err)
            return Promise.reject('Unable to create blog')
        })
}

const giveLike = (blog, user) => {
    const config = {
        method: 'put',
        url: `${baseUrl}/${blog.id}`,
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
        data: {
            likes: 1
        }
    }
    return axios
        .request(config)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.error(err)
            return Promise.reject('Unable to give like')
        })
}

const deleteBlog = (blog, user) => {
    const config = {
        method: 'delete',
        url: `${baseUrl}/${blog.id}`,
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    }
    return axios
        .request(config)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.error(err)
            return Promise.reject('Unable to delete blog')
        })
}

export default { getAll, createBlog, giveLike, deleteBlog }