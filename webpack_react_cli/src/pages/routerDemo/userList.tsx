import React, { memo, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

function UserList() {

    const userList = [
        {
            id: 1001,
            name: '张三',
            age: 18
        },
        {
            id: 1002,
            name: '李四',
            age: 19
        },
        {
            id: 1003,
            name: '王五',
            age: 20
        }
    ]

    const location = useLocation()

    useEffect(() => {
        console.log('location', location)
    }, [location])

    return (
        <div>
            UserList Page
            <br />
            <ul>
                {
                    userList.map((user) => (
                        <React.Fragment key={user.id}>
                            <Link to={`${user.id}`} state={{ ...user }}>{user.name}</Link>
                            <br />
                        </React.Fragment>
                    ))
                }
                <Link to="test">Test</Link>
            </ul>
            <br />
            <Outlet />
        </div>
    )
}

export default memo(UserList)