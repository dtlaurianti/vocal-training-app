import React from "react";
import { useState, useEffect } from "react";

import AudioPreloader from "./AudioPreloader";

function AudioPlayer({ BPM, sequence }) {
  // manages the starting and stopping of audio playback loops
  const [processes, setProcesses] = useState([]);
  // store the audio context in state
  const [audioContext, setAudioContext] = useState(null);

  // Use the Web Audio API to load an audio file into an audio buffer
  const loadAudioFile = async (audioContext, audioId) => {
    const response = await AudioPreloader(audioId);

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

  // play audio files according to sequence and BPM
  const loadAndPlayAudioFiles = async (
    audioContext,
    sequence,
    BPM
  ) => {
    const audioBuffers = [];
    const audioIds = [...new Set(sequence)]
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
      const note = sequence[i];
      playAudioBuffer(audioContext, audioBuffers[note], currentTime);
      currentTime += 60/BPM;
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
    loadAndPlayAudioFiles(audioContext, sequence, BPM);
  };

  useEffect(() => {
    // use the Web Audio API to play the audio
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
      {/* <div>{sequence.join(', ')}</div> */}
      <button onClick={startAudio}>Play</button>
    </div>
  );
}

export default AudioPlayer;
