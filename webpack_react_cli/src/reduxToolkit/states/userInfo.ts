import { createSlice } from '@reduxjs/toolkit'

// 定义state类型
type UserInfoType = {
    name: string,
    age: number
}

// 定义action类型
type UserInfoActionType = {
    type: string,
    payload: string | number
}

// 定义初始state
const initialState = {
    name: '张三',
    age: 18
}

// 定义userInfoSlice
const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        changeUserNameAction(state: UserInfoType, action: UserInfoActionType) {
            state.name = action.payload as string
        },
        changeUserAgeAction(state: UserInfoType, action: UserInfoActionType) {
            state.age = action.payload as number
        }
    }
})

// 取出action creator
const { changeUserNameAction, changeUserAgeAction } = userInfoSlice.actions
// 取出reducers
const userInfoReducer = userInfoSlice.reducer

export {
    changeUserNameAction,
    changeUserAgeAction,
    userInfoReducer,
    UserInfoType
}