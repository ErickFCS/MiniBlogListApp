import { useReducer, } from 'react'
import { notificationReducer, } from '../contexts/notification'
import notificationContext from '../contexts/notification'


const NotificationContextProvider = (props,) => {
    const [notification, notificationDispatch,] = useReducer(notificationReducer, {
        message: '',
        error: '',
    },)
    return (
        <notificationContext.Provider value={[notification, notificationDispatch,]}>
            {props.children}
        </notificationContext.Provider>
    )
}

export default NotificationContextProvider
