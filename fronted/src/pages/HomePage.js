import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import GroupContext from '../context/GroupProvider'
import MemberContext from '../context/MembersProvider'

export const HomePage = () => {
  const history = useNavigate();
  const { user } = useContext(AuthContext)
  const { getAllGroups, allGroups } = useContext(GroupContext)
  const { joined_group } = useContext(MemberContext)
  useEffect(() => {
    getAllGroups()
  }, [])
  const isGroupOwner = (group) => {
    return group.owner === user.user_id;
  }
  const joinGroup = (id) => {
    joined_group(id)
    history(`/group/${id}`);
  }
  const enterGroup = (id) => {
    history(`/group/${id}`);
  }
  const isMemberOfGroup = (group) => {
    return group.members.some(member => member === user.user_id);
  };
  return (
    <div className="h-screen p-8 bg-#0C1821">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allGroups.length > 0 ? (
          allGroups.map(group => (
            <div key={group.id} className="relative bg-#18242D shadow-md rounded-lg overflow-hidden">

              <div className="absolute inset-0"></div>
              <div className="p-6 relative z-10">
                <div className="flex items-center mb-4">
                  <img src={`http://localhost:8000${group.cover_image}`} className="w-16 h-16 object-cover rounded-full mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{group.name}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3 my-3">{group.description}</p>
                    {user && !isGroupOwner(group) && !isMemberOfGroup(group) && (
                      <button onClick={() => joinGroup(group.id)} className="bg-#121E27 text-white py-2 px-4 rounded-md hover:bg-600 transition duration-300">
                        Join
                      </button>
                    )}
                    {user && isMemberOfGroup(group) && (
                      <button onClick={() => enterGroup(group.id)} className="bg-#121E27 text-white py-2 px-4 rounded-md hover:bg-600 transition duration-300">
                        Enter
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No hay grupos</p>
        )}
      </div>
    </div>



  )
}
