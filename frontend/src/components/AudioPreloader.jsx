import React, { useState, useEffect } from "react";
import axios from "axios";

import { BACKEND_URL } from "../App";

async function AudioPreloader(audioIds) {
  console.log(audioIds);
  // const audioURLs = audioIds.map((audioId) => `${BACKEND_URL}/sample/${audioId}`);
  const audioElements = {};
  for (const audioId of audioIds) {
    try {
      // Fetch the audio file using Axios
      const response = await axios.get(`${BACKEND_URL}/sample/${audioId}`, {
        responseType: "blob",
      });
      if (response.status !== 200) {
        throw new Error("Error getting audio file");
      }
      // Create a Blob from the response data
      const audioBlob = new Blob([response.data], { type: "audio/wav" });

      // Generate a Blob URL for the Blob object
      const blobURL = URL.createObjectURL(audioBlob);

      // Play the audio
      const audioElement = new Audio();
      audioElement.src = blobURL;
      audioElement.preload = "auto";
      audioElements[audioId] = audioElement;

      /*
      // Create an <audio> element and set preload="auto"
      const audioElement = new Audio();
      audioElement.src = response.data.audio_url;
      audioElement.preload = "auto";
      audioElements[audioId] = audioElement;
      */

      // Append the <audio> element to the document (it will preload in the background)
      document.body.appendChild(audioElement);
    } catch (error) {
      console.error("Axios error:", error);
    }
  }
  return audioElements;
}

export default AudioPreloader;
