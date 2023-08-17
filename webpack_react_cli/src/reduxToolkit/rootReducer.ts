import { userInfoReducer } from './states/userInfo'
import { countReducer } from './states/counter'
import { languageReducer } from './states/language'

const rootReducer = {
    userInfo: userInfoReducer,
    counter: countReducer,
    language: languageReducer
}

export default rootReducer