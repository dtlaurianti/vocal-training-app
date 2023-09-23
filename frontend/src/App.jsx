import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

import AudioPlayer from "./components/AudioPlayer";
import SampleForm from "./components/SampleForm";

export const BACKEND_URL = "http://localhost:8000";

function App() {
  const [audioIds, setAudioIds] = useState(new Set(Array.from({ length: 88 }, (_, index) => 1 + index)));

  const addAudioId = (e) => {
    setAudioIds((prevAudioIds) => new Set([...prevAudioIds, e]));
  };

  return (
    <div>
      <h1>Audio Player App</h1>

      {/* ID Request Form */}
      <SampleForm onFormSubmit={addAudioId} />
      {/* Audio Player */}
      <AudioPlayer audioIds={[...audioIds]} />
    </div>
  );
}

export default App;
