import React, {
    memo,
    useState,
    forwardRef,
    useImperativeHandle
} from 'react'

function Demo05(props: Record<string, never>, ref) {
    const [name, setName] = useState('')

    const handleSetName = (value: string) => {
        setName(value)
    }

    useImperativeHandle(ref, () => {
        return {
            handleSetName,
            name
        }
    }, [name])

    return (
        <div>
            <p>This is Demo05 Page {name}</p>
        </div>
    )
}

export default memo(forwardRef(Demo05))