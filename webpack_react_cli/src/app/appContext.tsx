import React, {
    createContext,
    useReducer,
    useMemo,
    useContext
} from 'react'
// 定义count的action类型和user的action类型
type countActionType = { type: 'INCREMENT' | 'DECREMENT', value: number }
type userActionType = { type: 'CHANGE_NAME' | 'CHANGE_AGE', name?: string, age?: number }
// 定义修改count的reducer和修改user的reducer
const changeCount = (state: number, action: countActionType) => {
    const { type, value } = action

    switch (type) {
        case 'INCREMENT':
            return state + value
        case 'DECREMENT':
            return state - value
        default:
            return state
    }
}

const changeUser = (state: { name: string, age: number }, action: userActionType) => {
    const { type, name, age } = action

    switch (type) {
        case 'CHANGE_NAME': {
            if (name) {
                return { ...state, name }
            } else {
                return state
            }
        }
        case 'CHANGE_AGE': {
            if (age) {
                return { ...state, age }
            } else {
                return state
            }
        }
        default:
            return state
    }
}
// 定义AppContext的数据类型
type AppContextDataType = {
    count: number,
    user: {
        name: string,
        age: number
    },
    countDispatch: React.Dispatch<countActionType>,
    userDispatch: React.Dispatch<userActionType>
}
// 定义AppContextProvider的props类型
type IAppContextProvider = {
    children: React.ReactNode
}
// 创建AppContext
const AppContext = createContext<AppContextDataType | null>(null)

function AppContextProvider(props: IAppContextProvider) {
    const { children } = props
    const [count, countDispatch] = useReducer(changeCount, 0)
    const [user, userDispatch] = useReducer(changeUser, { name: 'jack', age: 18 })
    // 使用useMemo优化性能
    const usersContextDate = useMemo(() => {
        return {
            count,
            user,
            countDispatch,
            userDispatch
        }
    }, [count, user])

    return (
        <AppContext.Provider value={usersContextDate}>
            {children}
        </AppContext.Provider>
    )
}

// 定义使用AppContext的hooks，方便使用
function useAppContext() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext必须在AppContextProvider中使用')
    }
    return context
}

export default AppContextProvider
export { useAppContext }