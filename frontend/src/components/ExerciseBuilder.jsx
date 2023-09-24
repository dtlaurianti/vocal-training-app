import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormRange from "react-bootstrap/FormRange";

const MIN_BPM = 20;
const MAX_BPM = 300;

function ExerciseBuilder({ sendBPM, sendScale, sendPattern, sendLow, sendHigh }) {
  const [BPM, setBPM] = useState(120); // Set an initial value
  const [scale, setScale] = useState("Major"); // Set an initial value
  const [pattern, setPattern] = useState("Arpeggio Up"); // Set an initial value
  const [low, setLow] = useState('G2'); // Set an initial value
  const [high, setHigh] = useState('G3'); // Set an initial value

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
  }

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
      </Form>

      <Form.Select
        aria-label="Scale"
        onChange={handleScaleChange}>
        <option value="Major">Major</option>
        <option value="Minor">Minor</option>
      </Form.Select>

      <Form.Select
        aria-label="Pattern"
        onChange={handlePatternChange}>
        <option value="Arpeggio Up">Arpeggio Up</option>
        <option value="Arpeggio Down">Arpeggio Down</option>
      </Form.Select>
    </>
  );
}

export default ExerciseBuilder;
