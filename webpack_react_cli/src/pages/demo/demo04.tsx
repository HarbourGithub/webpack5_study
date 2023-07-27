import React, { memo, useRef } from 'react'
import Demo05 from './demo05'

function Demo04() {
    const demoRef = useRef(null)

    console.log('demoRef:', demoRef)

    return (
        <div>
            <p>This is Demo04 Page</p>
            <Demo05 ref={demoRef} />
        </div>
    )
}

export default memo(Demo04)
