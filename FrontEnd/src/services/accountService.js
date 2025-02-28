import axios from 'axios'

const baseUrl = '/api/login'

const login = async (username, password,) => {
    const response = await axios
        .post(baseUrl, {
            username,
            password,
        },).catch((err,) => {
            console.error(err,)
            return Promise.reject('unable to login',)
        },)
    return response.data
}

export default { login, }