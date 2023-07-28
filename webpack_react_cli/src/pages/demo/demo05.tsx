import React, {
    memo,
    useState,
    forwardRef,
    useImperativeHandle
} from 'react'

export type RefType = {
    handleSetName: (value: string) => void,
    name: string
}

function Demo05<T>(props: T, ref: React.Ref<RefType>) {
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