import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext';
const EventsContext = createContext()

export default EventsContext;


export const EventsProvider = ({ children }) => {
    const history = useNavigate()
    const { authTokens } = useContext(AuthContext)

    const createEvent=async()=>{

    }


    let contextData = {


    }




    return (
        <EventsContext.Provider value={contextData} >
            {children}
        </EventsContext.Provider>
    )
}