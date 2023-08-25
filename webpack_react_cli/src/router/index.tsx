import React, { lazy, Suspense, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '@pages/routerDemo/login'
import Main from '@pages/routerDemo/main'
import UserList from '@pages/routerDemo/userList'
import AccountCenter from '@pages/routerDemo/accountCenter'
import UserInfo from '@pages/routerDemo/userInfo'

function Router() {

    const ForgetPassword = lazy(() => import(/* webpackChunkName: "forgetPassword" */ '@pages/routerDemo/forgetPassword'))

    const SuspenseComponent = useCallback((Component: React.LazyExoticComponent<React.ComponentType<any>>): React.ReactElement => {
        return (
            <Suspense fallback={<div> Loading... </div>}>
                <Component />
            </Suspense>
        )
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="forgetPassword" element={SuspenseComponent(ForgetPassword)} />
            <Route path="main" element={<Main />}>
                <Route index element={<UserList />} />
                <Route path="userList" element={<UserList />}>
                    <Route path=":userId" element={<UserInfo />} />
                    <Route path="test" element={<div> This is Test Page</div>} />
                </Route>
                <Route path="accountCenter" element={<AccountCenter />} />
            </Route>
            <Route path="*" element={<div> This Page Not Exist</div>} />
        </Routes>
    )
}

export default Router