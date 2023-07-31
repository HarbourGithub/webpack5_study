import React, { memo, useCallback, useRef, useState } from 'react'
import { setCount, subscribe, getCount } from './store'

type commonFunc = () => void
type SubscribeFunc = (callback: commonFunc) => commonFunc

function Demo07() {
    const [number, forceUpdate] = useState(0)
    const unsubscribeRef = useRef<commonFunc>()

    const handleForceUpdate = useCallback(() => {
        forceUpdate(number + 1)
    }, [number])

    const syncExternalStore = (subscribeValue: SubscribeFunc, getSnapshot: () => number): number => {
        const callback = () => {
            handleForceUpdate()
        }
        unsubscribeRef.current = subscribeValue(callback)
        return getSnapshot()
    }
    
    if (unsubscribeRef.current) {
        unsubscribeRef.current()
    }
    const count = syncExternalStore(subscribe, getCount)

    return (
        <div>
            <p>This is Demo07 Page {count}</p>
            <button type="button" onClick={() => { setCount(count + 1) }}>SetCount</button>
        </div>
    )
}

export default memo(Demo07)
