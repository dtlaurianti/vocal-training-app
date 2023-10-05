import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormRange from "react-bootstrap/FormRange";
import { NOTE_NAMES_MAP } from "../assets/NoteMapping";

const MIN_BPM = 20;
const MAX_BPM = 300;
const MIN_NOTE = 12;
const MAX_NOTE = 96;

// TODO: pass in the selection options so that our menu is synced to database
function ExerciseBuilder({
  sendBPM,
  sendScale,
  sendPattern,
  sendStartNote,
  sendEndNote,
}) {
  const [BPM, setBPM] = useState(120); // Set an initial value
  const [scale, setScale] = useState("Major"); // Set an initial value
  const [pattern, setPattern] = useState("Arpeggio Up"); // Set an initial value
  const [startNote, setStartNote] = useState(43); // Set an initial value
  const [endNote, setEndNote] = useState(55); // Set an initial value

  const handleBPMChange = (e) => {
    // Update the state with the new value when the slider changes
    setBPM(e.target.value);
    sendBPM(e.target.value);
  };

  const handleScaleChange = (e) => {
    setScale(e.target.value);
    sendScale(e.target.value);
  };

  const handlePatternChange = (e) => {
    setPattern(e.target.value);
    sendPattern(e.target.value);
  };

  const handleStartNoteChange = (e) => {
    setStartNote(e.target.value);
    console.log(NOTE_NAMES_MAP[e.target.value]);
    sendStartNote(NOTE_NAMES_MAP[e.target.value]);
  };

  const handleEndNoteChange = (e) => {
    setEndNote(e.target.value);
    console.log(NOTE_NAMES_MAP[e.target.value]);
    sendEndNote(NOTE_NAMES_MAP[e.target.value]);
  };

  return (
    <>
      <Form>
        <Form.Label>BPM : {BPM}</Form.Label>
        <Form.Range
          value={BPM}
          onChange={handleBPMChange}
          min={MIN_BPM} // Set the minimum value
          max={MAX_BPM} // Set the maximum value
        />

        <Form.Select aria-label="Scale" onChange={handleScaleChange}>
          <option value="Major">Major</option>
          <option value="Natural Minor">Natural Minor</option>
        </Form.Select>

        <Form.Select aria-label="Pattern" onChange={handlePatternChange}>
          <option value="Arpeggio Up">Arpeggio Up</option>
          <option value="Arpeggio Down">Arpeggio Down</option>
        </Form.Select>

        <Form.Label htmlFor="startRange" id="startLabel">
          Start Tonic: {NOTE_NAMES_MAP[startNote]}
        </Form.Label>
        <Form.Range
          id="startRange"
          min={MIN_NOTE}
          max={MAX_NOTE}
          value={startNote}
          onChange={handleStartNoteChange}
        />
        <Form.Label htmlFor="endRange" id="endLabel">
          End Tonic: {NOTE_NAMES_MAP[endNote]}
        </Form.Label>
        <Form.Range
          id="endRange"
          min={MIN_NOTE}
          max={MAX_NOTE}
          value={endNote}
          onChange={handleEndNoteChange}
        />
      </Form>
    </>
  );
}

export default ExerciseBuilder;
