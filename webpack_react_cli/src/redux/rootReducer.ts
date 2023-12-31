import { combineReducers } from 'redux'
import { userInfoReducer } from './states/userInfo'
import { countReducer } from './states/counter'

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    counter: countReducer
})

export default rootReducer