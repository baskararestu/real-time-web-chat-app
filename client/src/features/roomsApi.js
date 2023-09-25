import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchRoomById = async (selectedRoom, token) => {
  try {
    if (!selectedRoom) {
      return "";
    }

    const response = await axios.get(`${baseUrl}/rooms/${selectedRoom}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching room name:", error);
    return "";
  }
};
