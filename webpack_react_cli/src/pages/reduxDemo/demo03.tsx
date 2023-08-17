import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { StateType } from '@src/reduxToolkit/stateType'

type StoreSelector = {
    userInfo: {
        name: string,
        age: number
    }
}

function Demo03() {
    const storeSelector = (state: StateType) => ({
        userInfo: state.userInfo
    }) as StoreSelector

    const { userInfo } = useSelector(storeSelector, shallowEqual) as StoreSelector

    return (
        <div style={{ backgroundColor: 'green' }}>
            <h1>This is Demo03 UserName: {userInfo.name} UserAge: {userInfo.age}</h1>
        </div>
    )
}

export default Demo03