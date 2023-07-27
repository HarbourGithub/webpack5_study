import React, { useId, memo } from 'react'

function Demo04() {

    const id = useId()

    return (
        <div>
            <p>This is Demo04 Page Id {id}</p>
        </div>
    )
}

export default memo(Demo04)
