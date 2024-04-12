import React, { useState } from "react";

const TemplateScale = () => {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => {
    const newZoomLevel = zoomLevel + 10;
    setZoomLevel(newZoomLevel);
    updateZoom(newZoomLevel);
  };

  const handleZoomOut = () => {
    const newZoomLevel = zoomLevel - 10;
    setZoomLevel(newZoomLevel);
    updateZoom(newZoomLevel);
  };

  const handleZoomChange = (e) => {
    const newZoomLevel = parseInt(e.target.value, 10);
    setZoomLevel(newZoomLevel);
    updateZoom(newZoomLevel);
  };

  const updateZoom = (newZoomLevel) => {
    document.body.style.zoom = `${newZoomLevel}%`;
  };
  return (
    <div className="w-44 fixed bottom-3 right-5 bg-white flex items-center py-1.5 px-2 rounded-full">
      <input
        type="range"
        className="w-full"
        value={zoomLevel}
        onChange={handleZoomChange}
      />
    </div>
  );
};

export default TemplateScale;
