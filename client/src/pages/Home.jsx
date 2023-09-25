import React, { useEffect, useState } from "react";
import Chatroom from "../components/chatroom";
import SideBar from "../components/SideBar";
import RoomList from "../components/RoomList";
import GreetingCard from "../components/GreetingCard";

function Home() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="py-16 px-5 flex w-full">
      <div className="w-1/4">
        <SideBar selectedRoom={selectedRoom}>
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
