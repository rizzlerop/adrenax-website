import React from 'react';

const AdrenaXLogo = ({ width = '100%', height = '100%', color = 'currentColor', style = {} }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {/* Left leg of 'A' */}
      <path
        d="M 49,15.5 
           L 17.3,83 
           C 16.8,84 17.5,85 18.5,85 
           L 40,85 
           C 40.8,85 41.5,84.2 41.7,83.4 
           C 44,70 51.5,57.5 63,43 
           C 63.6,42.2 63.4,41 62.5,40.5 
           L 49,15.5 
           Z"
        fill={color}
      />
      {/* Right leg of 'A' */}
      <path
        d="M 66.8,47 
           L 82.7,83 
           C 83.2,84 82.5,85 81.5,85 
           L 56.5,85 
           C 55.7,85 55.2,84.2 55.4,83.4 
           C 58.5,72 62.5,59.5 66.8,47 
           Z"
        fill={color}
      />
    </svg>
  );
};

export default AdrenaXLogo;
