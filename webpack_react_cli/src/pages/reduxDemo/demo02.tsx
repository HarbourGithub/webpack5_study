import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'

function Demo02() {
    const { count, userInfo } = useSelector(
        (state: any) => ({
            count: state.counter.count,
            userInfo: state.userInfo
        }),
        shallowEqual
    )

    return (
        <div style={{ backgroundColor: 'yellow' }}>
            <h1>This is Demo02</h1>
            <h2>Count: {count}</h2>
            <h2>UserName: {userInfo.userName}</h2>
            <h2>UserAge: {userInfo.userAge}</h2>
        </div>
    )
}

export default Demo02