import React, { useState } from "react";
import axios from "axios";
function ModalCreateRoom() {
  const [roomName, setRoomName] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleCloseModal = () => {
    const modal = document.getElementById("create_room");
    modal.close();
  };

  const fecthRooms = async () => {
    try {
      const response = await axios.get(`${baseUrl}/rooms`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response, "room in modal");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateRoom = async () => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("Access token is missing");
        return;
      }

      const response = await axios.post(
        `${baseUrl}/rooms`,
        {
          name: roomName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Room created successfully");
      fecthRooms();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <dialog id="create_room" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create a Room</h3>
        <div className="py-4">
          <input
            type="text"
            placeholder="Room Name"
            className="input input-bordered"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleCreateRoom}>
            Create
          </button>
          <button className="btn" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ModalCreateRoom;
