import { useReducer, } from 'react'
import { userReducer } from '../contexts/user'
import userContext from '../contexts/user'


const UserContextProvider = (props,) => {
    const [user, userDispatch,] = useReducer(userReducer, {},)
    return (
        <userContext.Provider value={[user, userDispatch,]}>{props.children}</userContext.Provider>
    )
}

export default UserContextProvider
