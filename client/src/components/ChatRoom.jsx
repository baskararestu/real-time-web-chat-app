import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

function Chatroom() {
  const [messages, setMessages] = useState([]);
  const [guid, setGuid] = useState("");
  const [roomName, setRoomName] = useState("");
  const messagesContainer = document.getElementById("messages");
  const userResource = JSON.parse(localStorage.getItem("user_resource"));
  const userId = userResource.id;
  const username = userResource.username;
  const roomResource = JSON.parse(localStorage.getItem("room_resource"));
  const roomId = roomResource.id;
  const ws = new WebSocket("ws://localhost:3000/cable");

  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected to websocket server");
      setGuid(Math.random().toString(36).substring(2, 15));

      ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            user_id: userId,
            channel: `MessagesChannel`,
            room_id: roomId,
            username: username,
          }),
        })
      );
      console.log(roomId);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "ping") return;
      if (data.type === "welcome") return;
      if (data.type === "confirm_subscription") return;

      console.log(data);
      const message = data.message;
      setMessagesAndScrollDown([...messages, message]); // No need to spread message again

      console.log("Username:", message.username);
    };

    return () => {
      ws.close();
    };
  }, [userId, roomId, messages]);

  const setMessagesAndScrollDown = (data) => {
    setMessages(data);
    resetScroll();
    console.log("State updated with new messages:", data);
  };

  const resetScroll = () => {
    if (!messagesContainer) return;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  useEffect(() => {
    fetchMessages();
    fetchRoomName();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = e.target.message.value;
    e.target.message.value = "";
    const messageData = {
      body,
      user_id: userId,
      room_id: roomId,
    };

    try {
      // Use Axios for the POST request
      await axios.post("http://localhost:3000/messages", messageData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // After successful POST, fetch updated messages
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      // Use Axios for the GET request
      const response = await axios.get("http://localhost:3000/messages");
      const data = response.data;
      setMessagesAndScrollDown(data);
      console.log(data, "fetchmessage");
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchRoomName = async () => {
    try {
      // Use Axios for the GET request
      const response = await axios.get(`http://localhost:3000/rooms/${1}`);
      const data = response.data;
      setRoomName(data);
    } catch (error) {
      console.error("Error fetching room name:", error);
    }
  };

  return (
    <div className="card h-[35rem] w-full shadow-lg bg-gray-500/20">
      <div className="messageHeader">
        <h1>{roomName.name}</h1>
        <p>Guid: {guid}</p>
      </div>
      <div className="messages" id="messages">
        {messages?.map((message) => (
          <div className="message" key={message.id}>
            <div className="chat chat-start">
              <div className="chat-header">{message.username}:</div>
              <div className="chat-bubble"> {message?.body ?? ""}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="messageForm">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center gap-3"
        >
          <input
            type="text"
            name="message"
            placeholder="Type here"
            className="input input-bordered w-[100%] max-w-4xl"
          />
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatroom;