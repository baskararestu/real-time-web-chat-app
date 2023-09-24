import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Chatroom({ selectedRoom }) {
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const messagesContainer = document.getElementById("messages");
  const userResource = JSON.parse(localStorage.getItem("user_data"));
  const userId = userResource.user_id;
  const username = userResource.username;
  const ws = useRef(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (ws.current) {
      ws.current.close();
    }

    if (!selectedRoom) {
      return;
    }

    // Open a new WebSocket connection for the selected room
    ws.current = new WebSocket("ws://localhost:3000/cable");

    ws.current.onopen = () => {
      console.log("Connected to websocket server");

      ws.current.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            user_id: userId,
            channel: `MessagesChannel`,
            room_id: selectedRoom,
            username: username,
          }),
        })
      );
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "ping") return;
      if (data.type === "welcome") return;
      if (data.type === "confirm_subscription") return;

      console.log(data);
      const message = data.message;
      setMessagesAndScrollDown([...messages, message]);
      console.log("Username:", message.username);
    };

    return () => {
      // Close the WebSocket connection when the component unmounts
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [userId, selectedRoom, messages]);

  const setMessagesAndScrollDown = (data) => {
    setMessages(data);
    resetScroll();
  };

  const resetScroll = () => {
    if (!messagesContainer) return;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  useEffect(() => {
    fetchMessages();
    fetchRoomName();
  }, [selectedRoom]); // Fetch messages and room name when selectedRoom changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = e.target.message.value;
    e.target.message.value = "";
    const messageData = {
      body,
      user_id: userId,
      room_id: selectedRoom,
    };

    try {
      await axios.post("http://localhost:3000/messages", messageData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      if (!selectedRoom) {
        return; // Don't proceed if selectedRoom is null
      }

      const response = await axios.get(
        `http://localhost:3000/messages?room_id=${selectedRoom}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(selectedRoom, "selected room message");
      const data = response.data;
      setMessagesAndScrollDown(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchRoomName = async () => {
    try {
      if (!selectedRoom) {
        return; // Don't proceed if selectedRoom is null
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

  if (!selectedRoom) {
    return <div>Select a room to chat.</div>;
  }
  console.log(selectedRoom);
  return (
    <div className="card h-[32rem] w-full shadow-lg bg-gray-500/20">
      <div className="messageHeader">
        <h1>{roomName.name}</h1>
      </div>
      <div
        className="flex flex-col justify-center mx-5 h-[50rem] overflow-y-scroll p-4 my-10 w-[95%]"
        id="messages"
      >
        {messages?.map((message) => (
          <div className="message" key={message.id}>
            <div
              className={`chat chat-start ${
                message.user_id === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header pb-2 font-semibold uppercase">
                {message.username}
              </div>
              <div className="chat-bubble chat-bubble-secondary w-[20rem] mb-5">
                {message?.body ?? ""}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="messageForm my-3 pt-2">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center gap-3`"
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
