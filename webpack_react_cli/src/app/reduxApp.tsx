import React from 'react'
import { Provider } from 'react-redux'
import store from '@redux/store'

function ReduxApp() {

    return (
        <Provider store={store}>
            <div>
                <h1>React Redux App</h1>
            </div>
        </Provider>
    )
}

export default ReduxApp