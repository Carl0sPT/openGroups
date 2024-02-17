import React, { useState,useContext} from 'react';
import AuthContext from '../context/AuthContext';
function RegisterPage() {
 const {registerUser,handleChange,formData}=useContext(AuthContext)

  return (
    <div className="flex items-center justify-center h-screen"> 
    <div className="max-w-md w-full"> 
      <h2 className="text-2xl font-bold mb-4 text-center">Sing up</h2> 
      <form onSubmit={registerUser} className="space-y-4">
        <div>
          <label htmlFor="username" className="block">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label htmlFor="email" className="block">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label htmlFor="password" className="block">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sing up</button>
      </form>
    </div>
  </div>
  );
}

export default RegisterPage;