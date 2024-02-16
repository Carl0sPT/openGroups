import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
export const LoginPage = () => {
  const {loginUser,name}=useContext(AuthContext)

  return (
    <div>
      
        <form onSubmit={loginUser}>
            <input type='text'name='username' placeholder='Enter usernaame'/>
            <input type='password'name='password' placeholder='Enter Password'/>
            <input type='submit' />

        </form>

    </div>
  )
}
