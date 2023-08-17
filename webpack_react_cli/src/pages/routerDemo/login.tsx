import React, { memo } from 'react'
import { Link } from 'react-router-dom'
  
function Login() {

    return (
        <div>
            Login Page
            <br />
            <Link to="forgetPassword">forgetPassword</Link>
            <br />
            <Link to="main">login in</Link>
        </div>
    )
}

export default memo(Login)