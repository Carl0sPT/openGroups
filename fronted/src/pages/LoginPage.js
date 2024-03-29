import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
export const LoginPage = () => {
  const {loginUser,name}=useContext(AuthContext)

  return (
<div className="flex items-center justify-center h-screen bg-#0C1821">
  <div className="max-w-md w-full px-4">
    <form onSubmit={loginUser} className="bg-#18242D  shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Welcome Open Groups</h2> 
      <div className="mb-4">
        <label htmlFor="username" className="block text-white text-sm font-bold mb-2">Username:</label>
        <input type="text" id="username" name="username" placeholder="Enter username" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-#0B161E " />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-#0B161E " />
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
      </div>
    </form>
  </div>
</div>


  )
}
