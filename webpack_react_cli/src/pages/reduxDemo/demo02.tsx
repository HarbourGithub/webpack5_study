import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { StateType } from '@src/reduxToolkit/stateType'

type StoreSelector = {
    counter: number
}

function Demo02() {
    const storeSelector = (state: StateType) => ({
        counter: state.counter
    }) as StoreSelector

    const { counter } = useSelector(storeSelector, shallowEqual) as StoreSelector

    return (
        <div style={{ backgroundColor: 'yellow' }}>
            <h1>This is Demo02 Counter: {counter}</h1>
        </div>
    )
}

export default Demo02