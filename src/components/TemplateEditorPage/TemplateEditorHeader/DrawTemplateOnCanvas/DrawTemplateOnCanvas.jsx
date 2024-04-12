import React, { useEffect, useRef } from "react";
import {  useSelector } from "react-redux";

const DrawTemplateOnCanvas = () => {
  const canvasRef = useRef(null);
  const industryTemplateData = useSelector((state) => state.template.template);
  const isDrawing = useSelector((state) => state.common.isDrawing);
  const droppedItems = useSelector((state) => state.common.droppedItems);
  console.log(droppedItems)

  useEffect(() => {
    if (isDrawing && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = industryTemplateData.width;
      canvas.height = industryTemplateData.height;

      ctx.imageSmoothingEnabled = true;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      img.src = `${industryTemplateData.THUMB_URI}`;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        droppedItems.forEach((obj) => {
          if (obj.type === "t") {
            ctx.font = `${obj.italic ? "italic" : "normal"} ${
              obj.bold ? "bold" : "normal"
            } ${obj.fontSize}px ${obj.fontFamily}`;

            ctx.fillStyle = `${obj.textBgColor}`;
            ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
            ctx.fillStyle = `${obj.textColor}`;
            ctx.fillText(obj.text, obj.x, obj.y + obj.height / 2 + 10);
          } else {
            const stickerImage = new Image();
            stickerImage.src = `${obj.ThumbPath}`;
            stickerImage.onload = () => {
              ctx.globalAlpha = obj.opacity;

              ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);

              if (obj.flip.HorizontalState) {
                ctx.scale(-1, 1);
              }
              if (obj.flip.VerticalState) {
                ctx.scale(1, -1);
              }
              ctx.rotate((obj.rotationAngle * Math.PI) / 180);
              ctx.drawImage(
                stickerImage,
                -obj.width / 2,
                -obj.height / 2,
                obj.width,
                obj.height
              );
              ctx.setTransform(1, 0, 0, 1, 0, 0);
            };
          }
        });
      };
    }
  }, [isDrawing]);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
};

export default DrawTemplateOnCanvas;
