import React, { useState, useDeferredValue } from 'react'
import List from './list'

function Test() {
    const [inputValue, setInputValue] = useState('')

    const deferredValue = useDeferredValue(inputValue)

    console.log('inputValue: ', inputValue)
    console.log('deferredValue: ', deferredValue)

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search..."
            />
            <List inputValue={deferredValue} />
        </div>
    )
}

export default Test
