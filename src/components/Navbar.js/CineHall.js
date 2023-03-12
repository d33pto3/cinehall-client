import React from "react";

export default function CineHall() {
  return (
    <svg
      width="250"
      height="35"
      viewBox="0 0 200 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <text
        x="0"
        y="35"
        fontFamily="Arial"
        fontSize="35"
        fontWeight="bold"
        fill="#00FFFF"
        filter="url(#glow)"
      >
        cineHall
      </text>
    </svg>
  );
}
