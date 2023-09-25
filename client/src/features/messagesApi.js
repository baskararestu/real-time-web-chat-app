import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchMessages = async (selectedRoom, token) => {
  try {
    if (!selectedRoom) {
      return [];
    }

    const response = await axios.get(
      `${baseUrl}/messages?room_id=${selectedRoom}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export const sendMessage = async (messageData, token) => {
  try {
    const response = await axios.post(`${baseUrl}/messages`, messageData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
