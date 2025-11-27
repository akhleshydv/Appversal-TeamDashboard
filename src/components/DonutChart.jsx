import React from 'react';

const DonutChart = ({ women, men, total }) => {
  const womenPercent = (women / total) * 100;
  const menPercent = (men / total) * 100;
  
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const womenDash = (womenPercent / 100) * circumference;
  const menDash = (menPercent / 100) * circumference;
  const womenOffset = circumference - womenDash;
  // Men segment starts where women ends, so we need to offset by womenDash
  const menOffset = circumference - menDash - womenDash;

  return (
    <div className="flex items-center justify-center space-x-6">
      <div className="relative">
        <svg width="150" height="150" className="transform -rotate-90">
          {/* Women segment */}
          <circle
            cx="75"
            cy="75"
            r={radius}
            fill="none"
            stroke="#ec4899"
            strokeWidth="30"
            strokeDasharray={circumference}
            strokeDashoffset={womenOffset}
            strokeLinecap="round"
          />
          {/* Men segment - rotated to start where women ends */}
          <g transform={`rotate(${womenPercent * 3.6} 75 75)`}>
            <circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="30"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - menDash}
              strokeLinecap="round"
            />
          </g>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{total}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-pink-500"></div>
          <span className="text-sm text-gray-700">Women</span>
          <span className="text-sm font-semibold text-gray-800">{women}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-400"></div>
          <span className="text-sm text-gray-700">Man</span>
          <span className="text-sm font-semibold text-gray-800">{men}</span>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;

