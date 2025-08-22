import React, { useState } from 'react';
import Grid from './Grid';
import SlopeInput from './SlopeInput';

function getRandomCoord() {
  return [
    Math.floor(Math.random() * 21) - 10,
    Math.floor(Math.random() * 21) - 10
  ];
}

function getNewSegment() {
  let a = getRandomCoord();
  let b = getRandomCoord();
  // Avoid vertical lines (undefined slope)
  while (a[0] === b[0]) {
    b = getRandomCoord();
  }
  return [a, b];
}

function getSlope([a, b]) {
  const dy = b[1] - a[1];
  const dx = b[0] - a[0];
  // Reduce fraction
  function gcd(x, y) {
    return y === 0 ? Math.abs(x) : gcd(y, x % y);
  }
  const g = gcd(dy, dx);
  return `${dy/g}/${dx/g}`;
}

export default function App() {
  const [segment, setSegment] = useState(getNewSegment());
  const [feedback, setFeedback] = useState('');
  const [answered, setAnswered] = useState(false);

  const slope = getSlope(segment);

  function handleAnswer(ans) {
    if (ans.replace(/\s/g, '') === slope) {
      setFeedback('Correct!');
      setAnswered(true);
    } else {
      setFeedback('Try again.');
    }
  }

  function handleNewSegment() {
    setSegment(getNewSegment());
    setFeedback('');
    setAnswered(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <h1>Segment Slope Quiz</h1>
      <Grid segment={segment} />
      <div style={{ margin: '20px 0' }}>
        <div>
          Endpoints: ({segment[0][0]}, {segment[0][1]}) and ({segment[1][0]}, {segment[1][1]})
        </div>
        <SlopeInput onSubmit={handleAnswer} disabled={answered} />
        <div style={{ margin: '10px', fontWeight: 'bold' }}>{feedback}</div>
        {answered && (
          <button onClick={handleNewSegment}>New Segment</button>
        )}
      </div>
    </div>
  );
}
