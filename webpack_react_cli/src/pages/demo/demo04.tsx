import React, { memo, useRef } from 'react'
import Demo05, { RefType } from './demo05'

function Demo04() {
    const demoRef = useRef<RefType>(null)

    const handleSetName = () => {
        if (demoRef.current) {
            demoRef.current.handleSetName('张三')
        }
    }

    return (
        <div>
            <p>This is Demo04 Page</p>
            <Demo05 ref={demoRef} />
            <button type="button" onClick={handleSetName}>Set Name</button>
        </div>
    )
}

export default memo(Demo04)
