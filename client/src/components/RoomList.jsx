import React, { useState, useEffect } from "react";
import axios from "axios";

function RoomList({ onRoomClick }) {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRoom, setActiveRoom] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          alert("access token is missing");
          return;
        }

        const response = await axios.get(`${baseUrl}/rooms`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response, "data room");
        setRooms(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomClick = (roomId) => {
    setActiveRoom(roomId); // Set the clicked room as active
    onRoomClick(roomId); // Call the parent component's handler
  };

  if (isLoading) {
    return <div className="py-5">Loading...</div>;
  }

  if (rooms.length === 0) {
    return <div className="py-5">There are no rooms.</div>;
  }

  return (
    <div className="mt-5 join join-vertical">
      <ul>
        {rooms.map((room) => (
          <li
            key={room.id}
            className={`join-item px-5 w-[10rem] p-1 border border-opacity-40 border-black/25 ${
              activeRoom === room.id
                ? "bg-green-400/50 hover:bg-green-400/80"
                : "bg-blue-500/30 hover:bg-blue-500/50"
            } hover:cursor-pointer`}
            onClick={() => handleRoomClick(room.id)}
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
