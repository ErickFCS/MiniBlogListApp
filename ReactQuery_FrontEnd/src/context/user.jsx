import { createContext, useReducer } from 'react'

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return {}
        default:
            return state
    }
}

export const setUser = (user) => ({
    type: 'SET',
    payload: user,
})

export const clearUser = () => ({
    type: 'CLEAR',
    payload: null,
})

const userContext = createContext()

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, {})
    return (
        <userContext.Provider value={[user, userDispatch]}>{props.children}</userContext.Provider>
    )
}

export default userContext
