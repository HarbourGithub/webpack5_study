import React, { memo } from 'react'
import { useAppContext } from '@src/app/appContext'

function Demo02() {

    const { countDispatch, userDispatch } = useAppContext()

    return (
        <div>
            <p>This is Demo02 Page</p>
            <button onClick={() => countDispatch({ type: 'INCREMENT', value: 3 })}>AddCount</button>
            <button onClick={() => userDispatch({ type: 'CHANGE_NAME', name: '李四' })}>ChangeName</button>
            <button onClick={() => userDispatch({ type: 'CHANGE_AGE', age: 20 })}>ChangeAge</button>
        </div>
    )
}

export default memo(Demo02)