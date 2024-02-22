import { createContext, useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext';
const MessageContext = createContext()

export default MessageContext;


export const MessageProvider = ({ children }) => {
    const history = useNavigate()
    const [messages, setMessages] = useState([])
    const { authTokens } = useContext(AuthContext)
   
    const sendMessage=async(formData)=>{
        let response = await fetch("http://localhost:8000/api/send-message/", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            },
            body: formData
        })
        let data = await response.json()
        
        if (response.status === 201) {
           console.log(data)
        } else {
           console.log(data)
        }
    }
    const getMessage=async(group_id)=>{
        let response = await fetch(`http://localhost:8000/api/groups/${group_id}/messages/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            },
        })
        let data = await response.json()
        
        if (response.status === 200) {
           setMessages(data)
           console.log(data)
        } else {
           console.log(data)
        }
    }

    let contextData = {
        sendMessage:sendMessage,
        getMessage:getMessage,
        messages:messages,

    }




    return (
        <MessageContext.Provider value={contextData} >
            {children}
        </MessageContext.Provider>
    )
}