import React, { memo } from 'react'

// 定义一个列表组件List
function List(props: { inputValue: string }) {
    const { inputValue } = props

    console.log('List render: ', inputValue)

    let k = 0
    for (let i = 0; i <= 300000000; i += 1) {
        k = i
    }

    return (
        <ul>
            <li>Cycle Times {k}Text: {inputValue}</li>
            <li>Cycle Times {k}Text: {inputValue}</li>
            <li>Cycle Times {k}Text: {inputValue}</li>
            <li>Cycle Times {k}Text: {inputValue}</li>
            <li>Cycle Times {k}Text: {inputValue}</li>
        </ul>
    )
}

export default memo(List)