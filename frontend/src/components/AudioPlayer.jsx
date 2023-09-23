import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { BACKEND_URL } from "../App";

function AudioPlayer({ audioId }) {
  const [audioBlobURL, setAudioBlobURL] = useState('');
  const playAudio = async (audioId) => {
    try {
      // Make a GET request to fetch the audio file
      const response = await axios.get(`${BACKEND_URL}/sample/${audioId}`, {
        responseType: 'blob', // Ensure Axios treats the response as binary data
      });

      // Create a Blob from the response data
      const audioBlob = new Blob([response.data], { type: 'audio/wav' });

      // Generate a Blob URL for the Blob object
      const blobURL = URL.createObjectURL(audioBlob);

      // Set the Blob URL for audio playback
      setAudioBlobURL(blobURL);

      // Play the audio
      const audioElement = document.getElementById('audio');
      audioElement.play();

    } catch (error) {
      console.error('Axios error:', error);
    }
  };

  return (
    <div>
      <button onClick={() => playAudio(audioId)}>Play Audio</button>
      {audioBlobURL && <audio id="audio" controls src={audioBlobURL}></audio>}
    </div>
  );
}


export default AudioPlayer;


  /*
  //-----------------------------------------------------
  useEffect(() => {
    const apiURL = `${BACKEND_URL}/sample/${audioId}`;
    axios.get(apiURL).then((response) => {
      if (response.status !== 200) {
        throw Error("Error getting audio file");
      }
      
      const blob = await

      setAudioURL(response.data.audio_url);


  // play the audio file
  const playAudio = () => {
    audioRef.current.play();
  }

  useEffect(() => {
    audioRef.current.src = audio;
  }, [audioId]);

  return (
    <div>
      <audio ref={audioRef} controls />
    </div>
  );

  return (
    <div>
      <audio ref={audioRef} controls>
        Your browser does not support the audio element.
      </audio>
      <button onClick={playAudio}>Play Audio</button>
    </div>
  );
}
*/

