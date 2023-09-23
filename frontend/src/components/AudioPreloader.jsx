import axios from "axios";

import { BACKEND_URL } from "../App";

async function AudioPreloader(audioId) {
  try {
    // Fetch the audio file using Axios
    const response = await axios.get(`${BACKEND_URL}/sample/${audioId}`, {
      responseType: "blob",
    });
    if (response.status !== 200) {
      throw new Error("Error getting audio file");
    }
    return response;
  } catch (error) {
    console.error("Axios error:", error);
  }
}

export default AudioPreloader;
