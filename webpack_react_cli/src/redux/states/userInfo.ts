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

// 定义action type常量
const changeUserName = 'CHANGE_USER_NAME'
const changeUserAge = 'CHANGE_USER_AGE'

// 定义action creator
const changeUserNameAction = (payload: string | number) => {
    return { type: changeUserName, payload }
}
const changeUserAgeAction = (payload: string | number) => {
    return { type: changeUserAge, payload }
}

// 定义reducer
const userInfoReducer = (state = { name: 'jack', age: 18 }, action: UserInfoActionType) => {
    const { type, payload } = action
    switch (type) {
        case changeUserName:
            return { ...state, name: payload }
        case changeUserAge:
            return { ...state, age: payload }
        default:
            return state
    }
}

export {
    changeUserNameAction,
    changeUserAgeAction,
    userInfoReducer,
    UserInfoType
}