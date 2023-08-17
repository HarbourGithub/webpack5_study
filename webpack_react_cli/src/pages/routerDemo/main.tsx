import React, { memo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './index.less'

function Main() {

    const navigate = useNavigate()

    // 跳转到指定页面
    const toPage = (path: string, state: { [key: string]: any }) => {
        navigate(path, { state })
    }

    return (
        <div className="main">
            <div className="sidebar">
                <button onClick={() => toPage('userList', { path: 'userList' })}>userList</button>
                <br />
                <button onClick={() => toPage('accountCenter', { path: 'accountCenter' })}>accountCenter</button>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default memo(Main)