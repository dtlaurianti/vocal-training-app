import { useState, useEffect, useRef } from "react";
import "./App.css";

import ExerciseBuilder from "./components/ExerciseBuilder";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  // const addAudioId = (e) => {
  //   setAudioIds((prevAudioIds) => new Set([...prevAudioIds, e]));
  // };

  // values recieved from exercise builder
  const [BPM, setBPM] = useState(120);
  const [scale, setScale] = useState("Major");
  const [pattern, setPattern] = useState("Arpeggio Up");
  const [startNote, setStartNote] = useState("G2");
  const [endNote, setEndNote] = useState("G3");

  const receiveBPM = (e) => {
    setBPM(e);
  };
  const receiveScale = (e) => {
    setScale(e);
  };
  const receivePattern = (e) => {
    setPattern(e);
  };
  const receiveStartNote = (e) => {
    setStartNote(e);
  };
  const receiveEndNote = (e) => {
    setEndNote(e);
  };

  return (
    <div className="app-width">
      <h1>Vocal Training App</h1>

      {/* ID Request Form */}
      {/* <SampleForm onFormSubmit={addAudioId} /> */}
      {/* Audio Player */}
      <ExerciseBuilder
        sendBPM={receiveBPM}
        sendScale={receiveScale}
        sendPattern={receivePattern}
        sendStartNote={receiveStartNote}
        sendEndNote={receiveEndNote}
      />
      <AudioPlayer
        BPM={BPM}
        scale={scale}
        pattern={pattern}
        startNote={startNote}
        endNote={endNote}
      />
    </div>
  );
}

export default App;
