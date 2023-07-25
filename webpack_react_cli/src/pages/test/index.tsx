import React, { ChangeEvent, useState } from 'react'

// 自定义 Hook：用于管理表单状态
type FormState = {
    [key: string]: string
}

const useFormState = (initialState: FormState) => {
    const [state, setState] = useState(initialState)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    return {
        state,
        handleChange,
    }
}

function Test() {
    const { state, handleChange } = useFormState({
        username: '',
        password: '',
    })

    return (
        <form>
            <input
                type="text"
                name="username"
                value={state.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Test