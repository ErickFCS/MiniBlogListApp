import { createContext, } from 'react'


const userContext = createContext()

export const userReducer = (state, action,) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return {}
        default:
            return state
    }
}

export const setUser = (user,) => ({
    type: 'SET',
    payload: user,
})

export const clearUser = () => ({
    type: 'CLEAR',
    payload: null,
})

export default userContext
