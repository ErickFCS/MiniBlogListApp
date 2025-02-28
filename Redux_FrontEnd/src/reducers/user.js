import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        clearUser(state, action) {
            return {}
        },
        setUser(state, action) {
            return action.payload
        },
    },
})

export const { clearUser, setUser } = userSlice.actions

export default userSlice.reducer
