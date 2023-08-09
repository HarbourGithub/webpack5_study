// 定义action类型
type ActionType = {
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
const decrementCountAction = (payload: number) => {
    return { type: decrementCount, payload }
}

// 定义reducer
const countReducer = (state = 0, action: ActionType) => {
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

export { incrementCountAction, decrementCountAction, countReducer }