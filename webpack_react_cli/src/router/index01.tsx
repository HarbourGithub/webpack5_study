import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from '@pages/routerDemo/login'
import ForgetPassword from '@pages/routerDemo/forgetPassword'
import Main from '@pages/routerDemo/main'
import UserList from '@pages/routerDemo/userList'
import AccountCenter from '@pages/routerDemo/accountCenter'
import UserInfo from '@pages/routerDemo/userInfo'

function Router() {

    const Routes = useRoutes([
        { path: '/', element: <Login /> },
        { path: 'forgetPassword', element: <ForgetPassword /> },
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
                { path: 'accountCenter', element: <AccountCenter /> },
            ]
        },
        { path: '*', element: <div> This Page Not Exist</div> },
    ])

    return Routes
}

export default Router