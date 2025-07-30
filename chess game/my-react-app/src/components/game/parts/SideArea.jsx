import React from "react";

const SideArea = ({ color, children }) => (
  <div className={`side-area side-${color}`}>
    <div className="side-label">
      {color.charAt(0).toUpperCase() + color.slice(1)} Side
    </div>
    {children}
  </div>
);

export default SideArea;
