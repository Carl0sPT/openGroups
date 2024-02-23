import React, { useState,useContext } from 'react'
import { useParams } from 'react-router-dom';
import EventsContext from '../context/EventsProvider';
export const CreateEvent = () => {
    const { id } = useParams()
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const {createEvent}=useContext(EventsContext)

    const handleSubmit = (event) => {
        event.preventDefault();

        const eventData = {
            name: name,
            description: description,
            date: date,
            group: id,
        };
        createEvent(eventData,id)

    };
    return (
        <div className="h-screen flex flex-col items-center justify-center ">
        <div className="max-w-md w-full shadow-md rounded-lg p-8 bg-#18242D">
            <h2 className="text-2xl text-white font-semibold mb-4">Create Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 bg-#0B161E text-white"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-white">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 bg-#0B161E text-white"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-white">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 bg-#0B161E text-white"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Create</button>
            </form>
        </div>
    </div>
    
    
    )
}
