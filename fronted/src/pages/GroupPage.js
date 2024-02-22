import React, { useContext, useEffect, useState } from 'react'
import { Await, useParams } from 'react-router-dom'
import GroupContext from '../context/GroupProvider'
import MemberContext from '../context/MembersProvider'
import AuthContext from '../context/AuthContext'
import MessageContext from '../context/MessageProvider'
export const GroupPage = () => {
    const { id } = useParams()
    const { user, authTokens } = useContext(AuthContext)
    const { detailsOneGroup, details_one_group } = useContext(GroupContext)
    const { getNameMembers, namesMembers, leave_group } = useContext(MemberContext)
    const { sendMessage, getMessage, messages } = useContext(MessageContext)

    const [text, setText] = useState("");

    const handleTextChange = (e) => {
        setText(e.target.value);
    };
    const [formData, setFormData] = useState({
        image: null
    });
    useEffect(() => {
        details_one_group(id)
        getNameMembers(id)
        getMessage(id)
        console.log(namesMembers)
        const interval = setInterval(() => {
            getMessage(id);
        }, 10000); 
    
        return () => clearInterval(interval);

    }, [id])


    const handleLeaveGroup = () => {
        leave_group(id)

    };
    const isGroupOwner = (group) => {
        return group.owner === user.user_id;
    };
    const isImageOwner = (sender) => {
        return sender === user.user_id;
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() && !formData.image) {
            alert("Please enter a message or upload an image.");
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append('group_id', id);
        formDataToSend.append('message_image', formData.image);
        formDataToSend.append('message_text', text);
        await sendMessage(formDataToSend)
        setText("")
        await getMessage(id)

    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        return `${formattedDate} - ${formattedTime}`;
    };

    return (
        <div className="container mx-auto p-8 h-screen">
            <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="md:w-2/3 md:mr-8 text-center">
                    <h2 className="text-3xl font-semibold mb-4">{detailsOneGroup.name}</h2>
                    <p className="text-gray-700 mb-8">{detailsOneGroup.description}</p>
                    {!isGroupOwner(detailsOneGroup) && (
                        <button onClick={handleLeaveGroup} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
                            Leave Group
                        </button>
                    )}
                    <div className="mb-8 my-8">
                        {messages.map((message, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-600 text-left my-5">{message.sender_username}</p>
                                        <div className="flex items-center">
                                            {message.message_image && message.message_image !== '/media/null' && (
                                                <img src={`http://localhost:8000${message.message_image}`} alt="Message" className="w-32 h-32 mr-4 mb-2" />
                                            )}
                                            <div>
                                                {message.message_text && (
                                                    <p className="text-sm text-gray-600">{message.message_text}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right ml-auto">
                                        <p className="text-sm text-gray-600">{formatTimestamp(message.timestamp)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                    <form className="mt-8" encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="text" className="block text-gray-700 font-bold mb-2">Message Text</label>
                            <textarea id="text" name="text" onChange={handleTextChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Upload Image</label>
                            <input type="file" id="image" name="image" onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
                    </form>
                </div>
                <div className="md:w-1/3 flex justify-center">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Members</h3>
                        <ul>
                            {namesMembers.map((member) => (
                                <li key={member.id}>{member.username}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}
