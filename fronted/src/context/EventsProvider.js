import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext';
const EventsContext = createContext()

export default EventsContext;


export const EventsProvider = ({ children }) => {
    const history = useNavigate()
    const { authTokens } = useContext(AuthContext)
    const [events, setEvents] = useState([])
    const createEvent=async(body,id)=>{
        let response= await fetch(`http://localhost:8000/api/createEvent/`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
            body:JSON.stringify(body)
        })
        let data=await response.json()
        if (response.status===201){
            console.log(data)
            history(`/group/${id}`)
        }else{
            console.log(data)
        }
    }
    const deleteEvents=async(event_id,id)=>{
        let response= await fetch(`http://localhost:8000/api/deleteEvent/${event_id}/`,{
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            },
        })
        let data=await response.json()
        if (response.status===200){
            console.log('borrado')
            history(`/group/${id}`)
        }else{
            console.log('error')
        }
    }

    const getEvents=async(group_id)=>{
        let response= await fetch(`http://localhost:8000/api/groups/${group_id}/events/`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
        })
        let data=await response.json()
        if (response.status===200){
            console.log('Eventos',data)
            setEvents(data)
        }else{
            console.log(data)
        }
    }





    let contextData = {
        createEvent:createEvent,
        getEvents:getEvents,
        events:events,
        deleteEvents: deleteEvents,
    }




    return (
        <EventsContext.Provider value={contextData} >
            {children}
        </EventsContext.Provider>
    )
}