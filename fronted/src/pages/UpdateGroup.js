import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import GroupContext from '../context/GroupProvider';
export const UpdateGroup = () => {
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const { detailsGroup, details_group, setDetailsGroup, updateGroup } = useContext(GroupContext)


    useEffect(() => {
        details_group(id)
    }, [id]);

    const handleSubmit = (event) => {

        event.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', detailsGroup.name);
        formData.append('description', detailsGroup.description);
        formData.append('cover_image', image);
        updateGroup(formData)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDetailsGroup(prevDetailsGroup => ({
            ...prevDetailsGroup,
            [name]: value
        }));
    }
    const handleImageChange = (event) => {
        setImage(event.target.files[0]); // Obtener el archivo de imagen seleccionado
    };

    return (
        
        <div className="h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Update Group</h2>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
                <div className="w-full">
                    <label htmlFor="name" className="block text-gray-700">Group Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={detailsGroup.name}
                        onChange={handleChange}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="description" className="block text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={detailsGroup.description}
                        onChange={handleChange}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 h-32"
                    ></textarea>
                </div>
                <div className="w-full">
                    <label htmlFor="cover_image" className="block text-gray-700">Cover Image:</label>
                    <input
                        type="file"
                        id="cover_image"
                        name="cover_image"
                        onChange={handleImageChange}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Update
                </button>
            </form>
        </div>
    </div>
    
    
    )
}
