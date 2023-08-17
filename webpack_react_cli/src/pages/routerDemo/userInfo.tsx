import React, { memo, useEffect } from 'react'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
  
function UserInfo() {

    const { userId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const location = useLocation()

    useEffect(() => {
        console.log('location', location)
    }, [location])

    return (
        <div>
            UserList Page {userId} {searchParams.get('name')}
            <br />
            <button onClick={() => setSearchParams({ name: '张三', age: '18' })}>张三</button>
        </div>
    )
}

export default memo(UserInfo)