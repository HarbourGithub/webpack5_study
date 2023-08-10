import { CounterType } from './states/counter'
import { UserInfoType } from './states/userInfo'

export type StateType = {
    counter: CounterType,
    userInfo: UserInfoType
}