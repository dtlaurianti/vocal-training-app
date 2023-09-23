import React from "react";
import { useState, useEffect } from "react";

import AudioPreloader from "./AudioPreloader";

function AudioPlayer({ audioIds, sequence, interval }) {
  // audioElements will be a hashtable of audio files by id
  const [audioElements, setAudioElements] = useState({});
  // store the audio context in state
  const [audioContext, setAudioContext] = useState(null);

  // Use the Web Audio API to load an audio file into an audio buffer
  const loadAudioFile = async (audioContext, audioId) => {
    const response = await AudioPreloader(audioId)
    console.log(response);
    console.log(response.data);

    const audioData = await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        // The event's result property contains the ArrayBuffer data
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(response.data);
    });
    return await audioContext.decodeAudioData(audioData);
  };

  // Use the Web Audio API play an audio buffer
  const playAudioBuffer = async (audioContext, audioBuffer, playTime) => {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(playTime);
  };

  // play audio files according to sequence and interval
  const loadAndPlayAudioFiles = async (
    audioContext,
    audioIds,
    sequence,
    interval
  ) => {
    const audioBuffers = [];
    // buffer all necessary audio files
    await Promise.all(
      audioIds.map(async (audioId) => {
        const audioFile = await loadAudioFile(audioContext, audioId);
        audioBuffers[audioId] = audioFile;
      })
    );

    let currentTime = audioContext.currentTime + 1;
    // play the audio files in sequence
    for (let i = 0; i < sequence.length; i++) {
      const audioId = sequence[i];
      playAudioBuffer(audioContext, audioBuffers[audioId], currentTime);
      currentTime += interval;
    }
  };

  // start the audio context on user action, triggers useEffect
  const startAudioContext = () => {
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        console.log("AudioContext started");
      });
    }
  };

  const startAudio = () => {
    startAudioContext();
    loadAndPlayAudioFiles(audioContext, audioIds, sequence, interval);
  };

  useEffect(() => {
    console.log("AudioPlayer useEffect");
    // use the Web Audio API to play the audio:w
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    setAudioContext(audioContext);

    return () => {
      // Clean up the AudioContext when the component unmounts
      audioContext.close().catch((error) => {
        console.error("Error closing AudioContext:", error);
      });
    };
  }, []);

  return (
    <div>
      <h1>Audio Player</h1>
      <button onClick={startAudio}>Play</button>
    </div>
  );
}

export default AudioPlayer;
