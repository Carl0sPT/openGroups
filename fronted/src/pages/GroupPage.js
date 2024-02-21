import React, { useContext, useEffect, useState } from 'react'
import { Await, useParams } from 'react-router-dom'
import GroupContext from '../context/GroupProvider'
import MemberContext from '../context/MembersProvider'
import AuthContext from '../context/AuthContext'
import ImagesContext from '../context/ImagesProvider'
export const GroupPage = () => {
    const { id } = useParams()
    const { user, authTokens } = useContext(AuthContext)
    const { detailsOneGroup, details_one_group } = useContext(GroupContext)
    const { getNameMembers, namesMembers, leave_group } = useContext(MemberContext)
    const { sendImage, images, getImages, deleteImages } = useContext(ImagesContext)
    const [formData, setFormData] = useState({
        image: null
    });
    useEffect(() => {
        details_one_group(id)
        getNameMembers(id)
        getImages(id)
        console.log(namesMembers)

    }, [id])
    useEffect(() => {

        getImages(id)

    }, [])


    const handleLeaveGroup = () => {
        leave_group(id)

    };
    const isGroupOwner = (group) => {
        return group.owner === user.user_id;
    };
    const isImageOwner = (sender) => {
        return sender=== user.user_id;
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        });
    };


    const findSenderName = (senderId) => {
        const sender = namesMembers.find(member => member.id === senderId);
        return sender ? sender.username : senderId;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) {
            console.error('Image file is missing');
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append('group_id', id);
        formDataToSend.append('image', formData.image);
        await sendImage(formDataToSend);
        await getImages(id);
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        return `${formattedDate} - ${formattedTime}`;
    };
    const deleteImage=async(image_id)=>{
        await deleteImages(image_id)
        await getImages(id);

    }
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
                    {images && images.map((image, index) => (
                        <div key={index} className="mb-4">
                            <img src={`http://localhost:8000/${image.image}`} alt={`Image ${index}`} className="w-32 h-32 mr-4 mb-2" />
                            <p className="text-sm text-gray-600">{formatTimestamp(image.timestamp)}</p>
                            <p className="text-sm text-gray-600">Sender: {findSenderName(image.sender)}</p>
                            {isImageOwner(image.sender) && (
                                <button onClick={()=>deleteImage(image.id)} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-300">
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                    <form className="mt-8" encType="multipart/form-data" onSubmit={handleSubmit}>
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
