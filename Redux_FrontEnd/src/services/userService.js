import axios from 'axios'

const baseUrl = '/api/users'

const fetchAll = async () => {
    return axios
        .get(baseUrl,)
        .then((res,) => res.data,)
        .catch((err,) => {
            console.error(err,)
            return Promise.reject('Unable to fetch all users',)
        },)
}

export default { fetchAll, }
