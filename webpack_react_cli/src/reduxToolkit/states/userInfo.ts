import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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

// 模拟异步请求
const simulateApiRequest = (value: number, delay: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value)
        }, delay)
    })
}

// 定义异步action
const asyncChangeUserAgeAction = createAsyncThunk(
    'userInfo/asyncChangeUserAgeAction',
    async (value: number) => {
        const result = await simulateApiRequest(value, 1000)
        return result
    }
)

// 定义userInfo slice
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncChangeUserAgeAction.fulfilled, (state, action) => {
                state.age = action.payload as number
            })
            .addCase(asyncChangeUserAgeAction.pending, (state, action) => {
                console.log(action.meta)
                console.log(state)
                console.log('pending')
            })
            .addCase(asyncChangeUserAgeAction.rejected, (state, action) => {
                console.log(state)
                console.log(action.error)
            })
    }
})

// 取出action creator
const { changeUserNameAction, changeUserAgeAction } = userInfoSlice.actions
// 取出reducer
const userInfoReducer = userInfoSlice.reducer

export {
    changeUserNameAction,
    changeUserAgeAction,
    asyncChangeUserAgeAction,
    userInfoReducer,
    UserInfoType
}