import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
    return axios
        .get(baseUrl)
        .then((response) => response.data)
        .catch((err) => {
            console.error(err)
            return Promise.reject('Unable to get all blogs')
        })
}

const createBlog = async (blog, user) => {
    return axios
        .post(baseUrl, blog, {
            headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.error(err)
            return Promise.reject('Unable to create blog')
        })
}

const giveLike = async (blog, user) => {
    const config = {
        method: 'put',
        url: `${baseUrl}/${blog.id}`,
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
        data: {
            likes: 1,
        },
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

const deleteBlog = async (blog, user) => {
    const config = {
        method: 'delete',
        url: `${baseUrl}/${blog.id}`,
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
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

const commentBlog = async (blog, user, comment) => {
    const config = {
        method: 'post',
        url: `${baseUrl}/${blog.id}/comments`,
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
        data: {
            comment,
        },
    }
    return axios
        .request(config)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.error(err)
            return Promise.reject('Unable to comment')
        })
}

export default { getAll, createBlog, giveLike, deleteBlog, commentBlog }
