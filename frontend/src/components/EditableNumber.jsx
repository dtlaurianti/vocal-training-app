import React, { useState } from "react";
import "./EditableButton.css"; // Import your CSS styles

function EditableNumber({ label, low, high }) {
  const [number, setNumber] = useState("");
  const [submittedNumber, setSubmittedNumber] = useState("");
  const [validationError, setValidationError] = useState(false);

  const handleInputChange = (e) => {
    if (!isNaN(e.target.value)) {
      const newNumber = e.target.value;
      setNumber(newNumber);
    }
    else {
      setNumber(number);
    }
  };

  const isValidNumber = (value) => {
    const number = parseFloat(value);
    return !isNaN(number) && number >= low && number <= high;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any desired actions with the number (e.g., validation)
    // For this example, we'll simply display the number in the editing field

    // Validate the input value
    if (!isValidNumber(number)) {
      setValidationError(true);
    } else {
      setValidationError(false);
      setSubmittedNumber(number);
    }
    setNumber(""); // Clear the input after submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          {label} : {submittedNumber} 
        </label>
        <input
          type="number"
          value={number}
          onInput={handleInputChange}
          placeholder="Enter a number"
          className="input-field"
        />
        {/* <button onClick={handleSubmit}>Submit</button> */}
      </form>
      {validationError && (
        <div className="validation-error">{`Please enter ${label} between ${low} and ${high}`}.</div>
      )}
    </div>
  );
}

export default EditableNumber;
