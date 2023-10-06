import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import Button from "react-bootstrap/Button";

import AudioPreloader from "./AudioPreloader";

function AudioPlayer({ BPM, scale, pattern, startNote, endNote }) {
  // store the audio context in state
  const [audioContext, setAudioContext] = useState(null);
  const [playback, setPlayback] = useState("stop");
  const [sequence, setSequence] = useState([]);

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
  const loadAndPlayAudioFiles = async (audioContext, sequence, BPM) => {
    const audioBuffers = [];
    const audioIds = [...new Set(sequence)];
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
      currentTime += 60 / BPM;
      const note = sequence[i];
      playAudioBuffer(audioContext, audioBuffers[note], currentTime);
    }
  };

  const startAudio = () => {
    setPlayback("play");
  };

  const pauseAudio = () => {
    setPlayback("pause");
  };

  const stopAudio = () => {
    setPlayback("stop");
  };

  // fetch sequence from backend
  useEffect(() => {
    axios
      .get(
        encodeURIComponent(
          `sequence/${scale}/${pattern}/${startNote}/${endNote}`
        )
      )
      .then((sequenceResponse) => {
        const response = sequenceResponse.data;
        setSequence(response);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Axios error:", error);
      });
  }, [scale, pattern, startNote, endNote]);

  // set the audio context to the correct state
  useEffect(() => {
    if (playback === "stop") {
      if (audioContext && audioContext.state !== "closed") {
        audioContext.close();
      }
      setAudioContext(null);
    } else if (playback === "pause") {
      if (audioContext && audioContext.state === "running") {
        audioContext.suspend();
      }
    } else {
      if (audioContext && audioContext.state === "running") {
        audioContext.close();
        setAudioContext(null);
      }
      // use the Web Audio API to play the audio
      setAudioContext(new AudioContext());
    }

    return () => {
      // Clean up the AudioContext when the component unmounts
      if (audioContext && audioContext.state !== "closed") {
        audioContext?.close().catch((error) => {
          console.error("Error closing AudioContext:", error);
        });
      }
    };
  }, [playback]);

  // play audio when we generate a new audio context for playback
  useEffect(() => {
    if (!audioContext || playback !== "play") {
      return;
    }
    loadAndPlayAudioFiles(audioContext, sequence, BPM);
  }, [audioContext]);

  return (
    <div>
      {/* <div>{sequence.join(', ')}</div> */}
      <Button onClick={startAudio} disabled={playback === "play"} variant="dark">
        Play
      </Button>
      <Button
        onClick={pauseAudio}
        disabled={playback === "pause" || playback === "stop"} variant="dark">
        Pause
      </Button>
      <Button onClick={stopAudio} disabled={playback === "stop"} variant="dark">
        Stop
      </Button>
    </div>
  );
}

export default AudioPlayer;
