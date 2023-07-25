import React from 'react'
import Demo01 from '@pages/demo/demo01'
import Demo02 from '@pages/demo/demo02'
import AppContextProvider from './appContext'

function App() {

    return (
        <AppContextProvider>
            <div>
                <h1>React App</h1>
                <Demo01 />
                <Demo02 />
            </div>
        </AppContextProvider>
    )
}

export default App