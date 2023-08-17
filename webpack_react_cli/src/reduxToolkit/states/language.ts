import { createSlice } from '@reduxjs/toolkit'
import { LanguageType } from '@src/language'

// 定义action类型
type LanguageActionType = {
    type: string,
    payload: LanguageType
}

// 定义初始state
const initialState = 'zh'

// 定义counterSlice
const counterSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguageAction(state: LanguageType, action: LanguageActionType) {
            return action.payload
        }
    }
})

// 取出action creator
const { changeLanguageAction } = counterSlice.actions
// 取出reducer
const languageReducer = counterSlice.reducer

export {
    languageReducer,
    changeLanguageAction
}