import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '@pages/routerDemo/login'
import ForgetPassword from '@pages/routerDemo/forgetPassword'
import Main from '@pages/routerDemo/main'
import UserList from '@pages/routerDemo/userList'
import AccountCenter from '@pages/routerDemo/accountCenter'
import UserInfo from '@pages/routerDemo/userInfo'

function Router() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="forgetPassword" element={<ForgetPassword />} />
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