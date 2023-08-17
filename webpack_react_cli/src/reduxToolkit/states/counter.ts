import { createSlice } from '@reduxjs/toolkit'
// 定义state类型
type CounterType = number

// 定义action类型
type CounterActionType = {
    type: string,
    payload: number
}

// 定义初始state
const initialState = 0

// 定义counterSlice
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incrementCountAction(state: CounterType, action: CounterActionType) {
            return state + action.payload
        },
        decrementCountAction(state: CounterType, action: CounterActionType) {
            return state - action.payload
        }
    }
})

// 取出action creator
const { incrementCountAction, decrementCountAction } = counterSlice.actions
// 取出reducer
const countReducer = counterSlice.reducer

export {
    incrementCountAction,
    decrementCountAction,
    countReducer,
    CounterType
}