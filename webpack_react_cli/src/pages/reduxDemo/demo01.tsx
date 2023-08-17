import React from 'react'
import { useDispatch } from 'react-redux'
import { incrementCountAction, decrementCountAction } from '@src/reduxToolkit/states/counter'
import { changeUserNameAction, changeUserAgeAction } from '@src/reduxToolkit/states/userInfo'

function Demo01() {
    const dispatch = useDispatch()

    return (
        <div style={{ backgroundColor: 'pink' }}>
            <h1>This is Demo01</h1>
            <button onClick={() => dispatch(incrementCountAction(3))}>AddCount</button>
            <button onClick={() => dispatch(decrementCountAction(2))}>SubCount</button>
            <button onClick={() => dispatch(changeUserNameAction('Tom'))}>ChangeUserName</button>
            <button onClick={() => dispatch(changeUserAgeAction(20))}>ChangeUserAge</button>
        </div>
    )
}

export default Demo01