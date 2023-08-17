import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from '@app/app'
// import ReduxApp from '@app/reduxApp'
// import RouterApp from '@app/routerApp'
// import { BrowserRouter } from 'react-router-dom'
import IntlApp from '@app/intlApp'
import { Provider } from 'react-redux'
import store from '@src/reduxToolkit/store'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(
    // <BrowserRouter>
    //     <App />
    //     <ReduxApp />
    //     <RouterApp />
    // </BrowserRouter>
    <Provider store={store}>
        <IntlApp />
    </Provider>
)