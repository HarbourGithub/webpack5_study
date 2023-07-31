import React, { memo, useSyncExternalStore } from 'react'
import { setCount, subscribe, getCount } from './store'

function Demo06() {

    const count = useSyncExternalStore(subscribe, getCount)

    return (
        <div>
            <p>This is Demo06 Page {count}</p>
            <button type="button" onClick={() => { setCount(count + 1) }}>SetCount</button>
        </div>
    )
}

export default memo(Demo06)
