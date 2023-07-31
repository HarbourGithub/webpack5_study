import React from 'react'
// import Demo01 from '@pages/demo/demo01'
// import Demo02 from '@pages/demo/demo02'
// import Demo03 from '@pages/demo/demo03'
// import Demo04 from '@pages/demo/demo04'
// import Demo06 from '@pages/demo/demo06'
// import Demo07 from '@pages/demo/demo07'
import Demo08 from '@pages/demo/demo08'
import AppContextProvider from './appContext'

function App() {

    return (
        <AppContextProvider>
            <div>
                <h1>React App</h1>
                {/* <Demo01 /> */}
                {/* <Demo02 /> */}
                {/* <Demo03 /> */}
                {/* <Demo04 /> */}
                {/* <Demo06 /> */}
                {/* <Demo07 /> */}
                <Demo08 />
            </div>
        </AppContextProvider>
    )
}

export default App