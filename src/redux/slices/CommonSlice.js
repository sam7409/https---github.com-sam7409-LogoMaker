import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  droppedItems: [],
  stickerItems: [],
  textItems: [],
  isMoving: false,
  isRotating: false,
  isResizing: {
    TopLeft: false,
    TopRight: false,
    BottomRight: false,
    BottomLeft: false,
    LeftCenter: false,
    TopCenter: false,
    RightCenter: false,
    BottomCenter: false,
  },
  selectedObject: null,
  initialPosition: { x: 0, y: 0 },
  initialAngle: 0,
  objectCenter: { x: 0, y: 0 },
  isDrawing: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    addDroppedItem: (state, action) => {
      state.droppedItems = action.payload.object;
      state.stickerItems = action.payload.object;
    },
    addTextItem: (state, action) => {
      state.droppedItems = action.payload.object;
      state.textItems = action.payload.object;
    },
    
    deleteDroppedObject: (state, action) => {
      const updatedItems = state.droppedItems.filter(
        (obj) => obj.id !== state.selectedObject.id
      );

      if (action.payload.type === "s") {
        state.stickerItems = state.stickerItems.filter(
          (sticker) => sticker.id !== state.selectedObject.id
        );
      } else {
        state.textItems = updatedItems.filter(
          (text) => text.id !== state.selectedObject.id
        );
      }

      state.droppedItems = updatedItems;
    },

    handleTextProperties: (state, action) => {
      const objectIndex = state.droppedItems.findIndex(
        (obj) => obj.id === state.selectedObject.id
      );

      const {
        type,
        textData,
        textColor,
        bgColor,
        textSize,
        textBold,
        textItalic,
        textUnderLine,
        textOpacity,
        textFontFamily,
        stickerOpacity,
        textAlign,
        textCase,
      } = action.payload;

      if (objectIndex !== -1) {
        switch (type) {
          case "text":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              text: textData,
            };
            break;

          case "textColor":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              textColor: textColor,
            };
            break;

          case "rc":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              textColor: textColor,
            };
            break;

          case "textBgColor":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              textBgColor: bgColor,
            };
            break;
          case "rb":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              textBgColor: bgColor,
            };
            break;

          case "txtAlign":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              textAlign: textAlign,
            };
            break;

          case "textSize":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              fontSize: textSize,
            };
            break;

          case "textBold":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              bold: textBold,
            };
            break;

          case "textIt":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              italic: textItalic,
            };
            break;

          case "textUnder":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              underLine: textUnderLine,
            };
            break;

          case "textOpacity":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              opacity: textOpacity,
            };
            break;

          case "txtCase":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              textCase: textCase,
            };
            break;

          case "textFF":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              fontFamily: textFontFamily,
            };
            break;

          case "stickerOpacity":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              opacity: stickerOpacity,
            };
            break;

          default:
            return;
        }
      }
    },

    handleStickerFLipping: (state, action) => {
      const { type, flipType, HorizontalFlipState, VerticalFlipState } =
        action.payload;

      const objectIndex = state.droppedItems.findIndex(
        (obj) => obj.id === state.selectedObject.id
      );

      if (objectIndex !== -1) {
        switch (type) {
          case "horizontal":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              flip: {
                type: flipType,
                HorizontalState: HorizontalFlipState,
              },
            };
            break;

          case "vertical":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              flip: {
                type: flipType,

                VerticalState: VerticalFlipState,
              },
            };
            break;

          default:
            return;
        }
      }
    },

    handleObjectPosition: (state, action) => {
      const { templateData, positionType } = action.payload;

      const objectIndex = state.droppedItems.findIndex(
        (obj) => obj.id === state.selectedObject.id
      );

      if (objectIndex !== -1) {
        switch (positionType) {
          case "center":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              x: templateData.width / 2 - state.selectedObject.width / 2,
              y: templateData.height / 2 - state.selectedObject.height / 2,
            };
            break;

          case "TL":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              x: 0,
              y: 0,
            };
            break;

          case "TR":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              x: templateData.width - state.selectedObject.width,
              y: 0,
            };
            break;

          case "BR":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              x: templateData.width - state.selectedObject.width,
              y: templateData.height - state.selectedObject.height,
            };
            break;

          case "BL":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              x: 0,
              y: templateData.height - state.selectedObject.height,
            };
            break;

          case "T":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              x: templateData.width / 2 - state.selectedObject.width / 2,
              y: 0,
            };
            break;

          case "R":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              x: templateData.width - state.selectedObject.width / 2,
              y: templateData.height / 2 - state.selectedObject.height / 2,
            };
            break;

          case "B":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              x: templateData.width / 2 - state.selectedObject.width / 2,
              y: templateData.height - state.selectedObject.height,
            };
            break;

          case "L":
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              x: 0,
              y: templateData.height / 2 - state.selectedObject.height / 2,
            };
            break;
          default:
            return;
        }
      }
    },

    handleMouseMove: (state, action) => {
      const { eventX, eventY } = action.payload;
      if (state.isMoving && state.selectedObject) {
        const newX = eventX - state.initialPosition.x;
        const newY = eventY - state.initialPosition.y;

        const objectIndex = state.droppedItems.findIndex(
          (obj) => obj.id === state.selectedObject.id
        );
        if (objectIndex !== -1) {
          state.droppedItems[objectIndex] = {
            ...state.droppedItems[objectIndex],
            x: newX,
            y: newY,
          };
        }
      } else if (state.isRotating && state.selectedObject) {
        const angleRad = Math.atan2(
          state.objectCenter.y - eventY,
          state.objectCenter.x - eventX
        );
        let angleDeg = (angleRad * 180) / Math.PI;

        let rotationChange = angleDeg + state.initialAngle;

        const objectIndex = state.droppedItems.findIndex(
          (obj) => obj.id === state.selectedObject.id
        );
        if (objectIndex !== -1) {
          state.droppedItems[objectIndex] = {
            ...state.droppedItems[objectIndex],
            rotationAngle: rotationChange,
          };
        }
      }

      //top-left corner

      if (state.isResizing.TopLeft && state.selectedObject) {
        const deltaX = eventX - state.initialPosition.x;
        const deltaY = eventY - state.initialPosition.y;

        const scaleFactorWidth =
          (state.selectedObject.width - deltaX) / state.selectedObject.width;
        const scaleFactorHeight =
          (state.selectedObject.height - deltaY) / state.selectedObject.height;

        const averageScaleFactor = (scaleFactorWidth + scaleFactorHeight) / 2;

        const objectIndex = state.droppedItems.findIndex(
          (obj) => obj.id === state.selectedObject.id
        );

        if (objectIndex !== -1) {
          state.droppedItems[objectIndex] = {
            ...state.droppedItems[objectIndex],
            x:
              state.droppedItems[objectIndex].x -
              state.droppedItems[objectIndex].width * averageScaleFactor +
              state.droppedItems[objectIndex].width,
            y:
              state.droppedItems[objectIndex].y -
              state.droppedItems[objectIndex].height * averageScaleFactor +
              state.droppedItems[objectIndex].height,
            width: state.droppedItems[objectIndex].width * averageScaleFactor,
            height: state.droppedItems[objectIndex].height * averageScaleFactor,
          };
        }

        state.initialPosition = {
          x: eventX,
          y: eventY,
        };
      }

      //top-right corner

      if (state.isResizing.TopRight && state.selectedObject) {
        const deltaX = eventX - state.initialPosition.x;
        const deltaY = state.initialPosition.y - eventY;

        const scaleFactorWidth =
          (state.selectedObject.width + deltaX) / state.selectedObject.width;
        const scaleFactorHeight =
          (state.selectedObject.height + deltaY) / state.selectedObject.height;
        const averageScaleFactor = (scaleFactorWidth + scaleFactorHeight) / 2;

        const objectIndex = state.droppedItems.findIndex(
          (obj) => obj.id === state.selectedObject.id
        );

        if (objectIndex !== -1) {
          state.droppedItems[objectIndex] = {
            ...state.droppedItems[objectIndex],
            y:
              state.droppedItems[objectIndex].y -
              state.droppedItems[objectIndex].height * averageScaleFactor +
              state.droppedItems[objectIndex].height,
            width: state.droppedItems[objectIndex].width * averageScaleFactor,
            height: state.droppedItems[objectIndex].height * averageScaleFactor,
          };
        }

        state.initialPosition = {
          x: eventX,
          y: eventY,
        };
      }

      // bottom-left corner
      if (state.isResizing.BottomLeft && state.selectedObject) {
        const deltaX = state.initialPosition.x - eventX;
        const deltaY = eventY - state.initialPosition.y;

        const scaleFactorWidth =
          (state.selectedObject.width + deltaX) / state.selectedObject.width;
        const scaleFactorHeight =
          (state.selectedObject.height + deltaY) / state.selectedObject.height;

        const averageScaleFactor = (scaleFactorWidth + scaleFactorHeight) / 2;

        const objectIndex = state.droppedItems.findIndex(
          (obj) => obj.id === state.selectedObject.id
        );

        if (objectIndex !== -1) {
          state.droppedItems[objectIndex] = {
            ...state.droppedItems[objectIndex],
            x:
              state.droppedItems[objectIndex].x -
              state.droppedItems[objectIndex].width * averageScaleFactor +
              state.droppedItems[objectIndex].width,
            width: state.droppedItems[objectIndex].width * averageScaleFactor,
            height: state.droppedItems[objectIndex].height * averageScaleFactor,
          };
        }

        state.initialPosition = {
          x: eventX,
          y: eventY,
        };
      }

      // left center
      if (state.isResizing.LeftCenter && state.selectedObject) {
        const deltaX = eventX - state.initialPosition.x;
        const deltaY = eventY - state.initialPosition.y;
        const scaleFactorWidth =
          (state.selectedObject.width - deltaX) / state.selectedObject.width;
        const scaleFactorHeight =
          (state.selectedObject.height - deltaY) / state.selectedObject.height;

        const averageScaleFactor = (scaleFactorWidth + scaleFactorHeight) / 2;

        const objectIndex = state.droppedItems.findIndex(
          (obj) => obj.id === state.selectedObject.id
        );

        if (objectIndex !== -1) {
          state.droppedItems[objectIndex] = {
            ...state.droppedItems[objectIndex],
            x:
              state.droppedItems[objectIndex].x -
              state.droppedItems[objectIndex].width * averageScaleFactor +
              state.droppedItems[objectIndex].width,
            width: state.droppedItems[objectIndex].width * averageScaleFactor,
          };
        }

        state.initialPosition = {
          x: eventX,
          y: eventY,
        };
      }

      // top center
      if (state.isResizing.TopCenter && state.selectedObject) {
        const deltaX = eventX - state.initialPosition.x;
        const deltaY = eventY - state.initialPosition.y;

        const scaleFactorWidth =
          (state.selectedObject.width - deltaX) / state.selectedObject.width;
        const scaleFactorHeight =
          (state.selectedObject.height - deltaY) / state.selectedObject.height;

        const averageScaleFactor = (scaleFactorWidth + scaleFactorHeight) / 2;

        const objectIndex = state.droppedItems.findIndex(
          (obj) => obj.id === state.selectedObject.id
        );

        if (objectIndex !== -1) {
          state.droppedItems[objectIndex] = {
            ...state.droppedItems[objectIndex],
            y:
              state.droppedItems[objectIndex].y -
              state.droppedItems[objectIndex].height * averageScaleFactor +
              state.droppedItems[objectIndex].height,
            height: state.droppedItems[objectIndex].height * averageScaleFactor,
          };
        }

        state.initialPosition = {
          x: eventX,
          y: eventY,
        };
      }

      //right center
      if (state.isResizing.RightCenter && state.selectedObject) {
        const deltaX = eventX - state.initialPosition.x;
        const deltaY = eventY - state.initialPosition.y;

        const scaleFactorWidth =
          (deltaX + state.selectedObject.width) / state.selectedObject.width;
        const scaleFactorHeight =
          (deltaY + state.selectedObject.height) / state.selectedObject.height;

        const avgScale = (scaleFactorWidth + scaleFactorHeight) / 2;
        const objectIndex = state.droppedItems.findIndex(
          (obj) => obj.id === state.selectedObject.id
        );

        if (objectIndex !== -1) {
          state.droppedItems[objectIndex] = {
            ...state.droppedItems[objectIndex],
            width: state.droppedItems[objectIndex].width * avgScale,
          };
        }

        state.initialPosition = {
          x: eventX,
          y: eventY,
        };
      }

      //bottom center
      if (state.isResizing.BottomCenter && state.selectedObject) {
        const deltaX = eventX - state.initialPosition.x;
        const deltaY = eventY - state.initialPosition.y;

        const scaleFactorWidth =
          (deltaX + state.selectedObject.width) / state.selectedObject.width;
        const scaleFactorHeight =
          (deltaY + state.selectedObject.height) / state.selectedObject.height;

        const avgScale = (scaleFactorWidth + scaleFactorHeight) / 2;
        const objectIndex = state.droppedItems.findIndex(
          (obj) => obj.id === state.selectedObject.id
        );

        if (objectIndex !== -1) {
          state.droppedItems[objectIndex] = {
            ...state.droppedItems[objectIndex],
            height: state.droppedItems[objectIndex].height * avgScale,
          };
        }

        state.initialPosition = {
          x: eventX,
          y: eventY,
        };
      }

      // bottom right text or sticker resizing
      if (state.isResizing.BottomRight && state.selectedObject) {
        const deltaX = eventX - state.initialPosition.x;
        const deltaY = eventY - state.initialPosition.y;

        const scaleFactorWidth =
          (deltaX + state.selectedObject.width) / state.selectedObject.width;
        const scaleFactorHeight =
          (deltaY + state.selectedObject.height) / state.selectedObject.height;

        const avgScale = (scaleFactorWidth + scaleFactorHeight) / 2;
        const objectIndex = state.droppedItems.findIndex(
          (obj) => obj.id === state.selectedObject.id
        );

        if (objectIndex !== -1) {
          if (state.selectedObject.type === "t") {
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              width: state.droppedItems[objectIndex].width * avgScale,
              height: state.droppedItems[objectIndex].height * avgScale,
              fontSize: state.droppedItems[objectIndex].fontSize * avgScale,
            };
          } else {
            state.droppedItems[objectIndex] = {
              ...state.droppedItems[objectIndex],
              width: state.droppedItems[objectIndex].width * avgScale,
              height: state.droppedItems[objectIndex].height * avgScale,
            };
          }
        }

        state.initialPosition = {
          x: eventX,
          y: eventY,
        };
      }
    },

    handleMouseDownOnObject: (state, action) => {
      state.isMoving = true;
      state.selectedObject = action.payload.object;
      const { eventX, eventY, object } = action.payload;

      const Object = state.droppedItems.find((obj) => obj.id === object.id);
      state.initialPosition = { x: eventX - Object.x, y: eventY - Object.y };
    },

    handleMouseDownResize: (state, action) => {
      const { resizeCorner, eventX, eventY } = action.payload;

      switch (resizeCorner) {
        case "TL":
          state.isResizing.TopLeft = true;

          state.initialPosition = { x: eventX, y: eventY };
          break;
        case "TR":
          state.isResizing.TopRight = true;

          state.initialPosition = { x: eventX, y: eventY };
          break;

        case "BR":
          state.isResizing.BottomRight = true;

          state.initialPosition = { x: eventX, y: eventY };
          break;
        case "BL":
          state.isResizing.BottomLeft = true;

          state.initialPosition = { x: eventX, y: eventY };
          break;

        case "LC":
          state.isResizing.LeftCenter = true;

          state.initialPosition = { x: eventX, y: eventY };
          break;

        case "TC":
          state.isResizing.TopCenter = true;

          state.initialPosition = { x: eventX, y: eventY };
          break;

        case "RC":
          state.isResizing.RightCenter = true;

          state.initialPosition = { x: eventX, y: eventY };
          break;
        case "BC":
          state.isResizing.BottomCenter = true;

          state.initialPosition = { x: eventX, y: eventY };
          break;

        default:
          return;
      }
    },

    handleMouseUpOnObject: (state) => {
      state.isMoving = false;
      state.isRotating = false;
      state.isResizing.TopLeft = false;
      state.isResizing.TopRight = false;
      state.isResizing.BottomRight = false;
      state.isResizing.BottomLeft = false;
      state.isResizing.LeftCenter = false;
      state.isResizing.TopCenter = false;
      state.isResizing.RightCenter = false;
      state.isResizing.BottomCenter = false;
    },

    handleSelectObject: (state, action) => {
      state.selectedObject = action.payload;
    },

    handleDeselectObject: (state) => {
      state.selectedObject = null;
    },

    handleRotationOnMouseDown: (state, action) => {
      const { eventX, eventY, object, centerX, centerY } = action.payload;

      state.isRotating = true;

      const angleRad = Math.atan2(centerY - eventY, centerX - eventX);
      const angleDeg = (angleRad * 180) / Math.PI;

      state.objectCenter = { x: centerX, y: centerY };
      state.initialAngle = object.rotationAngle - angleDeg;
    },

    handleDuplicateObject: (state, action) => {
      state.droppedItems = action.payload;
    },

    handleSetReplaceIcon: (state, action) => {
      const { replacedValue, stickerData } = action.payload;
      if (replacedValue) {
        const objectIndex = state.droppedItems.findIndex(
          (obj) => obj.id === state.selectedObject.id
        );
        if (objectIndex !== -1) {
          state.droppedItems[objectIndex] = {
            ...state.droppedItems[objectIndex],
            CategoryName: stickerData.CategoryName,
            ThumbPath: stickerData.ThumbPath,
          };
        }
      }
    },
    handleIsDrawingState: (state) => {
      state.isDrawing = true;
    },
    handleStopDrawingState: (state) => {
      state.isDrawing = false;
    },
  },
});

export const {
  handleSetReplaceIcon,
  addDroppedItem,
  addTextItem,
  deleteDroppedObject,
  handleTextProperties,
  handleObjectPosition,
  handleStickerFLipping,
  handleMouseMove,
  handleMouseDownOnObject,
  handleMouseDownResize,
  handleMouseUpOnObject,
  handleSelectObject,
  handleDeselectObject,
  handleRotationOnMouseDown,
  handleDuplicateObject,
  handleIsDrawingState,
  handleStopDrawingState,
} = commonSlice.actions;

export default commonSlice.reducer;
