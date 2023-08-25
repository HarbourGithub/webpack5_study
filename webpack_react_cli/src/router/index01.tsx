import React, { lazy, Suspense, useCallback } from 'react'
import { useRoutes } from 'react-router-dom'
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

    const Routes = useRoutes([
        { path: '/', element: <Login /> },
        { path: 'forgetPassword', element: SuspenseComponent(ForgetPassword) },
        {
            path: 'main',
            element: <Main />,
            children: [
                { index: true, element: <UserList /> },
                {
                    path: 'userList',
                    element: <UserList />,
                    children: [
                        { path: ':userId', element: <UserInfo /> },
                        { path: 'test', element: <UserInfo /> }
                    ]
                },
                {
                    path: 'accountCenter', 
                    element: <AccountCenter />
                },
            ]
        },
        { path: '*', element: <div> This Page Not Exist</div> },
    ])

    return Routes
}

export default Router