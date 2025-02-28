import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogs'
import notificationReducer from './reducers/notifications'
import userReducer from './reducers/user'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        user: userReducer,
    },
})

export default store
