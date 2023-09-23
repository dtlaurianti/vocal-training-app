import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

import AudioPlayer from './components/AudioPlayer';
import SampleForm from './components/SampleForm';

export const BACKEND_URL = 'http://localhost:8000';

function App() {
  const [audioId, setAudioId] = useState('');

  const handleAudioIdChange = (e) => {
    setAudioId(e);
  };

  return (
    <div>
      <h1>Audio Player App</h1>
      
      {/* ID Request Form */}
      <SampleForm onFormSubmit={handleAudioIdChange} />
      {/* Audio Player */}
      <AudioPlayer audioId={audioId} />
    </div>
  );

}

export default App
