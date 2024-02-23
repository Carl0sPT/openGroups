import React, { useEffect, useContext } from 'react'
import GroupContext from '../context/GroupProvider'
import { NavLink } from 'react-router-dom'
export const MyAdminGroups = () => {
    const { adminGroups, myAdminGroups,deleteGroup } = useContext(GroupContext)
    useEffect(() => {
        myAdminGroups()
    }, [])
    const handleDelete=async(id)=>{
        await deleteGroup(id)
    }
    return (
        <div className="h-screen p-8 bg-#0C1821">
        <div className="flex justify-center mt-8 mb-5">
            <NavLink to="/createGroup" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Create Group
            </NavLink>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminGroups.length > 0 ? (
                adminGroups.map(group => (
                    <div key={group.id} className="bg-#18242D shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <img src={`http://localhost:8000${group.cover_image}`} className="w-16 h-16 object-cover rounded-full mr-4" />
                                <div>
                                    <h3 className="text-xl  text-white font-semibold">{group.name}</h3>
                                    <p className=" text-white mb-4 line-clamp-3">{group.description}</p>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <NavLink to={`/updateGroup/${group.id}`} className="text-blue-500 hover:text-blue-700 mr-4">
                                    Update
                                </NavLink>
                                <button onClick={()=>handleDelete(group.id)} className="text-red-500 hover:text-red-700">
                                        Delete
                                    </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-700 text-center">No hay grupos</p>
            )}
        </div>
    </div>

    )
}
