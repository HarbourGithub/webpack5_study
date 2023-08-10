import { Dispatch } from 'redux'
// 定义state类型
type CounterType = number

// 定义action类型
type CounterActionType = {
    type: string,
    payload: number
}

// 定义action type常量
const incrementCount = 'INCREMENT_COUNT'
const decrementCount = 'DECREMENT_COUNT'

// 定义action creator
const incrementCountAction = (payload: number) => {
    return { type: incrementCount, payload }
}
const decrementCountAction = (payload: number): any => {
    return (dispatch: Dispatch) => {
        setTimeout(() => {
            dispatch({ type: decrementCount, payload })
        }, 1000)
    }
}

// 定义reducer
const countReducer = (state = 0, action: CounterActionType) => {
    const { type, payload } = action
    switch (type) {
        case incrementCount:
            return state + payload
        case decrementCount:
            return state - payload
        default:
            return state
    }
}

export {
    incrementCountAction,
    decrementCountAction,
    countReducer,
    CounterType
}