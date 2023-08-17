import { LanguageType } from '@src/language'
import { CounterType } from './states/counter'
import { UserInfoType } from './states/userInfo'

export type StateType = {
    counter: CounterType,
    userInfo: UserInfoType,
    language: LanguageType
}