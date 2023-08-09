import { combineReducers } from 'redux'
import { userInfoReducer } from './reducers/userInfo'
import { countReducer } from './reducers/counter'

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    counter: countReducer
})

export default rootReducer