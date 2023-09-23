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
    [
      [30, 34, 37],
      [32, 35, 39],
      [34, 37, 41],
      [35, 39, 42],
      [37, 41, 44],
      [39, 42, 46],
      [41, 44, 47],
      [42, 46, 49],
    ]
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
