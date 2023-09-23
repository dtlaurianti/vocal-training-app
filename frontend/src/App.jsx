import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

import AudioPlayer from "./components/AudioPlayer";
import SampleForm from "./components/SampleForm";

export const BACKEND_URL = "http://localhost:8000";

function App() {
  const [audioIds, setAudioIds] = useState(
    new Set(Array.from({ length: 64 }, (_, index) => 1 + index))
  );
  const [sequence, setSequence] = useState(
    Array.from({ length: 10 }, (_, index) => 30 + index)
  );
  const [interval, setInterval] = useState(1);

  const addAudioId = (e) => {
    setAudioIds((prevAudioIds) => new Set([...prevAudioIds, e]));
  };

  return (
    <div>
      <h1>Vocal Training App</h1>

      {/* ID Request Form */}
      {/* <SampleForm onFormSubmit={addAudioId} /> */}
      {/* Audio Player */}
      <AudioPlayer
        audioIds={[...audioIds]}
        sequence={sequence}
        interval={interval}
      />
    </div>
  );
}

export default App;
