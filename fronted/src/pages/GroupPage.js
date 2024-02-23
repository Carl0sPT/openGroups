import React, { useContext, useEffect, useState } from "react";
import { Await, useParams, Link } from "react-router-dom";
import GroupContext from "../context/GroupProvider";
import MemberContext from "../context/MembersProvider";
import AuthContext from "../context/AuthContext";
import MessageContext from "../context/MessageProvider";
import EventsContext from "../context/EventsProvider";
export const GroupPage = () => {
  const { id } = useParams();
  const { user, authTokens } = useContext(AuthContext);
  const { detailsOneGroup, details_one_group } = useContext(GroupContext);
  const { getNameMembers, namesMembers, leave_group } =
    useContext(MemberContext);
  const { sendMessage, getMessage, messages } = useContext(MessageContext);
  const { getEvents, events, deleteEvents } = useContext(EventsContext);
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const [formData, setFormData] = useState({
    image: null,
  });
  useEffect(() => {
    details_one_group(id);
    getNameMembers(id);
    getMessage(id);
    getEvents(id);
    console.log(namesMembers);
    const interval = setInterval(() => {
      getMessage(id);
    }, 10000);

    return () => clearInterval(interval);
  }, [id]);

  const handleLeaveGroup = () => {
    leave_group(id);
  };
  const isGroupOwner = (group) => {
    return group.owner === user.user_id;
  };
  const isEventOwner = (sender) => {
    return sender === user.username;
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !formData.image) {
      alert("Please enter a message or upload an image.");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("group_id", id);
    formDataToSend.append("message_image", formData.image);
    formDataToSend.append("message_text", text);
    await sendMessage(formDataToSend);
    setText("");
    await getMessage(id);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return `${formattedDate} - ${formattedTime}`;
  };

  const handleDeleteEvent = (event_id) => {
    deleteEvents(event_id, id);
  };
  return (
    <div className="mx-auto p-8 h-screen bg-#0C1821 w-full">
      <div className="flex flex-col md:flex-row items-start justify-center w-full">
        <div className="w-full md:w-2/3 md:mr-8 text-center bg-#18242D rounded-lg p-8">
          <h2 className="text-3xl text-white font-semibold mb-4">
            {detailsOneGroup.name}
          </h2>
          <p className="text-gray-700 mb-8 text-white">
            {detailsOneGroup.description}
          </p>
          {!isGroupOwner(detailsOneGroup) && (
            <button
              onClick={handleLeaveGroup}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Leave Group
            </button>
          )}
          <Link to={`/createEvent/${id}`}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              Create Event
            </button>
          </Link>
          <div className="mb-8 my-8">
            {messages.map((message, index) => (
              <div key={index} className="mb-4 bg-#18242D rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="bg-#0B161E text-white rounded-lg p-4">
                    <p className="text-sm text-white text-left mb-2">
                      {message.sender_username}
                    </p>
                    <div className="flex items-center">
                      {message.message_image &&
                        message.message_image !== "/media/null" && (
                          <img
                            src={`http://localhost:8000${message.message_image}`}
                            alt="Message"
                            className="w-32 h-32 mr-4 mb-2 rounded-lg"
                          />
                        )}
                      <div>
                        {message.message_text && (
                          <p className="text-sm text-white">
                            {message.message_text}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-auto">
                    <p className="text-sm text-white">
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form
            className="mt-8"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label htmlFor="text" className="block text-white font-bold mb-2">
                Message Text
              </label>
              <textarea
                id="text"
                name="text"
                onChange={handleTextChange}
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-#0B161E text-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-white font-bold mb-2"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-#0B161E text-white"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="md:w-1/3 flex flex-col justify-start items-end ">
        <div className="mb-8 md:mb-4 bg-#18242D rounded-lg p-4 self-start w-full">
    <h3 className="text-xl font-semibold mb-4 text-white">Events</h3>
    <ul>
        {events.map((event) => (
            <li className="text-white" key={event.id}>
                <div className="mb-2">
                    <p>{event.name}</p>
                    <p className="text-gray-400">Date: {event.date}</p>
                    <p className="text-gray-400">Description: {event.description}</p>
                </div>
                <div>
                    {isEventOwner(event.created_by) && (
                        <button onClick={() => handleDeleteEvent(event.id)} className="px-3 py-1 bg-red-600 text-white rounded-md">Delete</button>
                    )}
                </div>
            </li>
        ))}
    </ul>
</div>
          <div className="bg-#18242D rounded-lg p-4 self-start w-full">
            <h3 className="text-xl font-semibold mb-4 text-white">Members</h3>
            <ul>
              {namesMembers.map((member) => (
                <li className="text-white" key={member.id}>
                  {member.username}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
