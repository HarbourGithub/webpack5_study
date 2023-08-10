import { userInfoReducer } from './states/userInfo'
import { countReducer } from './states/counter'

const rootReducer = {
    userInfo: userInfoReducer,
    counter: countReducer
}

export default rootReducer