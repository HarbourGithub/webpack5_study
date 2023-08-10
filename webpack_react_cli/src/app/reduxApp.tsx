import React from 'react'
import { Provider } from 'react-redux'
import store from '@redux/store'
import Demo01 from '@pages/reduxDemo/demo01'
import Demo02 from '@pages/reduxDemo/demo02'
import Demo03 from '@pages/reduxDemo/demo03'

function ReduxApp() {

    return (
        <Provider store={store}>
            <div>
                <h1>React Redux App</h1>
                <Demo01 />
                <Demo02 />
                <Demo03 />
            </div>
        </Provider>
    )
}

export default ReduxApp