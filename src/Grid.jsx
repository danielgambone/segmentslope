import React from 'react';

const size = 400;
const padding = 40;
const axisMin = -10;
const axisMax = 10;
const step = (size - 2 * padding) / (axisMax - axisMin);

function coordToSvg([x, y]) {
  return [
    padding + (x - axisMin) * step,
    size - (padding + (y - axisMin) * step)
  ];
}

export default function Grid({ segment }) {
  const [a, b] = segment;
  const aSvg = coordToSvg(a);
  const bSvg = coordToSvg(b);

  const ticks = [];
  for (let i = axisMin; i <= axisMax; i++) {
    ticks.push(i);
  }

  return (
    <svg width={size} height={size} style={{ background: '#f8f8f8', border: '1px solid #ccc' }}>
      {/* Axes */}
      <line x1={padding} y1={size - padding} x2={size - padding} y2={size - padding} stroke="black" />
      <line x1={padding} y1={padding} x2={padding} y2={size - padding} stroke="black" />
      {/* Ticks and labels */}
      {ticks.map(i => {
        const x = coordToSvg([i, 0])[0];
        const y = coordToSvg([0, i])[1];
        return (
          <g key={i}>
            {/* x-axis ticks */}
            <line x1={x} y1={size - padding - 5} x2={x} y2={size - padding + 5} stroke="#888" />
            <text x={x} y={size - padding + 18} fontSize="12" textAnchor="middle">{i}</text>
            {/* y-axis ticks */}
            <line x1={padding - 5} y1={y} x2={padding + 5} y2={y} stroke="#888" />
            <text x={padding - 18} y={y + 4} fontSize="12" textAnchor="end">{i}</text>
          </g>
        );
      })}
      {/* Segment */}
      <line x1={aSvg[0]} y1={aSvg[1]} x2={bSvg[0]} y2={bSvg[1]} stroke="red" strokeWidth={3} />
      {/* Endpoints */}
      <circle cx={aSvg[0]} cy={aSvg[1]} r={6} fill="blue" />
      <circle cx={bSvg[0]} cy={bSvg[1]} r={6} fill="blue" />
    </svg>
  );
}
