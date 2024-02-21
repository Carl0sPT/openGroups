import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext';
const MemberContext = createContext()

export default MemberContext;


export const MemberProvider = ({ children }) => {
    const history = useNavigate()
    const [namesMembers, setNamesMembers] = useState([])
    const { authTokens } = useContext(AuthContext)
    const getNameMembers=async(group_id)=>{
        let response=await fetch(`http://localhost:8000/api/getMembersName/${group_id}/`,{
            method:'GET',
            headers: {
                'Authorization': `Bearer  ` + String(authTokens.access),
            }
        })
        let data=await response.json()
        if (response.status===200){
            setNamesMembers(data.members)

        }else{
            console.log('error')
        }
    }

    const joined_group=async(group_id)=>{
        let response=await fetch(`http://localhost:8000/api/joinGroup/${group_id}/`,
        {
            method:'POST',
            headers: {
                'Authorization': `Bearer  ` + String(authTokens.access),
            }

        })
        let data=await response.json()
        if (response.status===200){
            console.log(data)

        }else{
            console.log('error')
        }
    }
    const leave_group=async(group_id)=>{
        let response=await fetch(`http://localhost:8000/api/leaveGroup/${group_id}/`,
        {
            method:'DELETE',
            headers: {
                'Authorization': `Bearer  ` + String(authTokens.access),
            }

        })
        let data=await response.json()
        if (response.status===200){
            console.log(data)
            history('/')
        }else{
            console.log('error')
        }
    }

   
    let contextData = {
        getNameMembers:getNameMembers,
        namesMembers:namesMembers,
        joined_group:joined_group,
        leave_group:leave_group,
       
    }




    return (
        <MemberContext.Provider value={contextData} >
            {children}
        </MemberContext.Provider>
    )
}