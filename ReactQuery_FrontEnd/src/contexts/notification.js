import { createContext, } from 'react'


const notificationContext = createContext()

export const notificationReducer = (state, action,) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return { message: '', error: '', lastTimeOut: null, }
        default:
            return state
    }
}

export const setNotification = ({ message = '', error = '', lastTimeOut = null, },) => ({
    type: 'SET',
    payload: { message, error, lastTimeOut, },
})

export const clearNotification = () => ({
    type: 'CLEAR',
    payload: null,
})

export default notificationContext
