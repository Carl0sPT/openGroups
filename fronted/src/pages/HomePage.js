import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
export const HomePage = () => {

  const {authTokens,logoutUser} = useContext(AuthContext)

  return (
    <div>
       <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <ul>
        
      </ul>
    </div>
  )
}
