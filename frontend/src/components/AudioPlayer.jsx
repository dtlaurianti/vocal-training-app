import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import AudioPreloader from "./AudioPreloader";

function AudioPlayer({ audioIds }) {
  // audioElements will be a hashtable of audio files by id
  const [audioElements, setAudioElements] = useState({});
  // preload the audio files
  useEffect(() => {
    async function fetchAudioElements() {
      try{
        const audioElements = await AudioPreloader(audioIds);
        setAudioElements(audioElements);
      } catch (error) {
        console.error("Axios error:", error);
      }
      const audioElements = await AudioPreloader(audioIds);
      setAudioElements(audioElements);
    }
    fetchAudioElements();
  }, [audioIds]);
  
  const playAudio = async (audioId) => {
    const audioElement = audioElements[audioId];
    audioElement.play();
  }

  console.log(audioElements);

  return (
    <div>
      <h1>Audio Player</h1>
      {Object.keys(audioElements).map((index) => (
        console.log(index, audioElements[index]),
        <button key={index} onClick={() => playAudio(index)}>
          Play Audio {parseInt(index)}
        </button>
      ))}
    </div>
  );

}

export default AudioPlayer;