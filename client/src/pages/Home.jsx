import React, { useEffect, useState } from "react";
import Chatroom from "../components/chatroom";
import SideBar from "../components/SideBar";
import RoomList from "../components/RoomList";
import GreetingCard from "../components/GreetingCard";

function Home() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomName, setRoomName] = useState("");
  console.log(roomName, "roomname");
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const fetchRoomName = async () => {
    try {
      if (!selectedRoom) {
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/rooms/${selectedRoom}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setRoomName(data);
    } catch (error) {
      console.error("Error fetching room name:", error);
    }
  };

  useEffect(() => {
    fetchRoomName();
  }, [selectedRoom]);
  return (
    <div className="py-16 px-5 flex w-full">
      <div className="w-1/4">
        <SideBar>
          <h1 className="text-black bg-red-500">{roomName.name}</h1>
          <RoomList onRoomClick={handleRoomSelect} />
        </SideBar>
      </div>
      <div className="w-3/4">
        <div className="flex w-full h-full">
          {selectedRoom ? (
            <Chatroom selectedRoom={selectedRoom} />
          ) : (
            <div className="w-full">
              <GreetingCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
