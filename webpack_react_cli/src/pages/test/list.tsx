import React, { memo } from 'react'

// 定义一个减速组件ListItem
function ListItem(props: { text: string }) {
    const { text } = props

    let k = 0
    for (let i = 0; i <= 100000000; i += 1) {
        k = i
    }

    return (
        <li>{k}Text: {text}</li>
    )
}

// 定义一个列表组件List
function List(props: { inputValue: string }) {
    const { inputValue } = props

    console.log('List render')

    const listItems: React.JSX.Element[] = []
    for (let i = 0; i < 10; i += 1) {
        listItems.push(<ListItem key={i} text={inputValue} />)
    }
    return (
        <ul>
            {listItems}
        </ul>
    )
}

export default memo(List)