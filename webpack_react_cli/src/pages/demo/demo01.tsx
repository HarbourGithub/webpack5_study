import React, { memo } from 'react'
import { useAppContext } from '@src/app/appContext'

function Demo01() {

    const { count, user } = useAppContext()

    return (
        <div>
            <p>This is Demo01 Page count is {count}</p>
            <p>name: {user.name}</p>
            <p>age: {user.age}</p>
        </div>
    )
}

export default memo(Demo01)