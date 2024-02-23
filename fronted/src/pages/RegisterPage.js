import React, { useState,useContext} from 'react';
import AuthContext from '../context/AuthContext';
function RegisterPage() {
 const {registerUser,handleChange,formData}=useContext(AuthContext)

  return (
    <div className="flex items-center justify-center h-screen bg-#0C1821">
    <div className="max-w-md w-full px-4">
      <form onSubmit={registerUser} className="bg-#18242D shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Sign up</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-whiteleading-tight focus:outline-none focus:shadow-outline bg-#0B161E text-gray-300" placeholder='Enter username' />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-whiteleading-tight focus:outline-none focus:shadow-outline bg-#0B161E text-gray-300" placeholder='Enter email' />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white Eleading-tight focus:outline-none focus:shadow-outline bg-#0B161E text-gray-300" placeholder='Enter password' />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
  
  );
}

export default RegisterPage;