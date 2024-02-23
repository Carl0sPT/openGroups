import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
export const Navbar = () => {
  let{user,logoutUser}=useContext(AuthContext)
  return (
<nav className="bg-#0B161E p-4 flex justify-between items-center">
  <div className="flex items-center">
    <Link to="/" className="text-white mr-4">Home</Link>
  </div>
  <div className="flex justify-center flex-grow">
    <span className="text-white">Open Groups</span>
  </div>
  <div className="flex items-center">
    {user ? (
      <>
        <span className="text-white mr-4">Hello {user.username}</span>
        <Link to="/" className="text-white mr-4" onClick={logoutUser}>Logout</Link>
      </>
    ) : (
      <>
        <Link to="/login" className="text-white mr-4">Login</Link>
        <Link to="/register" className="text-white mr-4">Register</Link>
      </>
    )}
  </div>
</nav>
  )
}
