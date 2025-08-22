import React, { useState } from 'react';

export default function SlopeInput({ onSubmit, disabled }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <label>
        Slope (fraction):
        <input
          type="text"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder="e.g. 3/4 or -2/5"
          style={{ marginLeft: 8 }}
        />
      </label>
      <button type="submit" disabled={disabled || !value} style={{ marginLeft: 8 }}>
        Submit
      </button>
    </form>
  );
}
