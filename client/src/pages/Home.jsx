import React, { useEffect, useState } from "react";

function Home() {
  const [messages, setMessages] = useState([]);
  const [guid, setGuid] = useState("");
  const [roomName, setRoomName] = useState("");
  const messagesContainer = document.getElementById("messages");
  const userResource = JSON.parse(localStorage.getItem("user_resource"));
  const userId = userResource.id;
  const username = userResource.username;
  const roomResource = JSON.parse(localStorage.getItem("room_resource"));
  const roomId = roomResource.id;

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/cable");

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

      // Access the username from the message
      console.log("Username:", message.username);

      // ...
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
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
    await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });
  };

  const fetchMessages = async () => {
    const response = await fetch("http://localhost:3000/messages");
    const data = await response.json();
    setMessagesAndScrollDown(data);
    console.log(data, "fetchmessage");
  };

  const fetchRoomName = async () => {
    const response = await fetch(`http://localhost:3000/rooms/${1}`);
    const data = await response.json();
    setRoomName(data);
  };

  return (
    <div>
      <div className="messageHeader">
        <h1>{roomName.name}</h1>
        <p>Guid: {guid}</p>
      </div>
      <div className="messages" id="messages">
        {messages?.map((message) => (
          <div className="message" key={message.id}>
            <div>
              <p>{message.username}: </p>
            </div>
            <p>{message?.body ?? ""}</p>
          </div>
        ))}
      </div>
      <div className="messageForm">
        <form onSubmit={handleSubmit}>
          <input className="messageInput" type="text" name="message" />
          <button className="messageButton" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
