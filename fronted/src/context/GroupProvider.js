import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext';
const GroupContext = createContext()

export default GroupContext;


export const GroupProvider = ({ children }) => {
    const history = useNavigate()
    const { authTokens } = useContext(AuthContext)
    const [adminGroups, setAdminGroups] = useState([])
    const [detailsGroup, setDetailsGroup] = useState([])
    const [detailsOneGroup, setDetailsOneGroup] = useState([])
    const [allGroups, setAllGroups] = useState([])

    const createGroup = async (formData) => {

        let response = await fetch('http://localhost:8000/api/createGroup/', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer  ` + String(authTokens.access),
            }

        })
        let data = await response.json()

        if (response.status === 201) {

            history('/myAdminGroups')
        } else {
            alert('Error')
        }
    }

    const myAdminGroups = async () => {
        let response = await fetch('http://localhost:8000/api/myAdminGroups/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer  ` + String(authTokens.access),
            }

        })
        let data = await response.json()
        console.log(data)
        if (response.status === 200) {
            setAdminGroups(data)
        } else {
            alert('error')
        }

    }

    const details_group = async (group_id) => {
        let response = await fetch(`http://localhost:8000/api/obtainedGroup/${group_id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer  ` + String(authTokens.access),
            }

        })
        let data = await response.json()
        console.log(data)
        if (response.status === 200) {
            setDetailsGroup(data)
        } else {
            alert('error')
        }
    }

    const details_one_group = async (group_id) => {
        let response = await fetch(`http://localhost:8000/api/oneGroupDetails/${group_id}/`, {
            method: 'GET'
        })
        let data = await response.json()
        console.log(data)
        if (response.status === 200) {
            setDetailsOneGroup(data)
        } else {
            alert('error')
        }
    }
    const updateGroup = async (formData) => {
        let response = await fetch("http://localhost:8000/api/updateGroup/", {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            },
            body: formData
        })
        let data = await response.json()
        console.log(data)
        if (response.status === 200) {
            history('/myAdminGroups')
        } else {
            alert('algo salio mal')
        }
    }
    const deleteGroup = async (id) => {

        let response = await fetch(`http://localhost:8000/api/deleteGroup/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
        })
        let data = await response.json()
        console.log(data)
        if (response.status.ok) {
            alert('eliminado')
        }
    }

    const getAllGroups = async () => {
        let response = await fetch('http://localhost:8000/api/allGroups/', {
            method: 'GET'
        })
        let data = await response.json()
        if (response.status === 200) {
            setAllGroups(data)
            console.log(data)
        } else {
            console.log('error')
        }
    }
    let contextData = {
        createGroup: createGroup,
        myAdminGroups: myAdminGroups,
        adminGroups: adminGroups,
        detailsGroup: detailsGroup,
        details_group: details_group,
        setDetailsGroup: setDetailsGroup,
        updateGroup: updateGroup,
        deleteGroup: deleteGroup,
        getAllGroups: getAllGroups,
        allGroups: allGroups,
        details_one_group: details_one_group,
        detailsOneGroup: detailsOneGroup,

    }




    return (
        <GroupContext.Provider value={contextData} >
            {children}
        </GroupContext.Provider>
    )
}