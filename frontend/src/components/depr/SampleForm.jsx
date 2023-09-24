import React, { useState } from 'react';

function SampleForm({ onFormSubmit }) {

  const [selectedSample, setSelectedSample] = useState('1');

  // request a given sample id through the form
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(selectedSample);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select an audio file by number:
        <input
          type="number"
          value={selectedSample}
          onChange={(e) => setSelectedSample(e.target.value)}
          min="1"  // Set minimum number
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SampleForm;
