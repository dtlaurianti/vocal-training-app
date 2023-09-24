import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

import ExerciseBuilder from "./components/ExerciseBuilder";
import AudioPlayer from "./components/AudioPlayer";
import SampleForm from "./components/depr/SampleForm";

export const BACKEND_URL = "http://localhost:8000";

function App() {
  const [audioIds, setAudioIds] = useState(
    new Set(Array.from({ length: 64 }, (_, index) => 1 + index))
  );

  const [sequence, setSequence] = useState([]);
  const [interval, setInterval] = useState(1);

  // const addAudioId = (e) => {
  //   setAudioIds((prevAudioIds) => new Set([...prevAudioIds, e]));
  // };

  // values recieved from exercise builder
  const [BPM, setBPM] = useState(120);
  const [scale, setScale] = useState("Major");
  const [pattern, setPattern] = useState("1u3u5d3d1");
  const [low, setLow] = useState("G2");
  const [high, setHigh] = useState("E4");

  const receiveBPM = (e) => {
    setBPM(e);
  };
  const receiveScale = (e) => {
    setScale(e);
  };
  const receivePattern = (e) => {
    setPattern(e);
  };
  const receiveLow = (e) => {
    setLow(e);
  };
  const receiveHigh = (e) => {
    setHigh(e);
  };

  // sequence builder
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sequence/${scale}/${pattern}/${low}/${high}`)
      .then((sequenceResponse) => {
        setSequence(sequenceResponse.data);
        console.log("Sequence Response:", sequenceResponse.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Axios error:", error);
      });
  }, [scale, pattern, low, high]);

  return (
    <div>
      <h1>Vocal Training App</h1>

      {/* ID Request Form */}
      {/* <SampleForm onFormSubmit={addAudioId} /> */}
      {/* Audio Player */}
      <ExerciseBuilder
        sendBPM={receiveBPM}
        sendScale={receiveScale}
        sendPattern={receivePattern}
        sendLow={receiveLow}
        sendHigh={receiveHigh}
      />
      <AudioPlayer audioIds={[...audioIds]} BPM={BPM} sequence={sequence} />
    </div>
  );
}

export default App;
