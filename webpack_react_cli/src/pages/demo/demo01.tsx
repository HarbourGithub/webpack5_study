import React, { useState, useEffect, useCallback } from 'react'

function Demo01() {

    const [count, setCount] = useState(0)

    const testFun = useCallback(() => {
        console.log('testFun', count)
    }, [count])

    useEffect(() => {
        console.log('useEffect is running')
    }, [testFun])

    return (
        <div>
            <p>This is Demo01 Page</p>
            <button onClick={() => setCount(count + 1)}>AddCount</button>
            <button onClick={() => testFun()}>testFun</button>
        </div>
    )
}

export default Demo01