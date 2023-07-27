import React, { useState, useDeferredValue, memo } from 'react'
import List from './list'

function Demo03() {
    const [inputValue, setInputValue] = useState('')

    const deferredValue = useDeferredValue(inputValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleChange')
        setInputValue(e.target.value)
    }

    console.log('inputValue:', inputValue)
    console.log('deferredValue:', deferredValue)

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Search..."
            />
            <List inputValue={deferredValue} />
        </div>
    )
}

export default memo(Demo03)
