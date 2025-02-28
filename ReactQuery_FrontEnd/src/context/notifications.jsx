import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return { message: '', error: '', lastTimeOut: null }
        default:
            return state
    }
}

export const setNotification = ({ message = '', error = '', lastTimeOut = null }) => ({
    type: 'SET',
    payload: { message, error, lastTimeOut },
})

export const clearNotification = () => ({
    type: 'CLEAR',
    payload: null,
})

const notificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, {
        message: '',
        error: '',
    })
    return (
        <notificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </notificationContext.Provider>
    )
}

export default notificationContext
