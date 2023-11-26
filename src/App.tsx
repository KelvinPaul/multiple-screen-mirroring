import { CSSProperties, useEffect, useState } from "react";
import { LocalStorage } from "./localStorage";

const getId = () => {
  return `UNIQUE_ID__${Math.trunc(Math.random() * 1e7)}`;
};

function App() {
  const [id] = useState(getId);
  const [windowX, setWindowX] = useState(0);
  const [windowY, setWindowY] = useState(0);

  const clearId = () => {
    LocalStorage.removeUnusedId(id);
  }

  useEffect(() => {
    const intervalTimeKey = setInterval(() => {
      setWindowX(window.screenX);
      setWindowY(window.screenY);
      LocalStorage.setState(id, {
        windowX: window.screenX,
        windowY: window.screenY,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    }, 100);
    window.addEventListener('beforeunload', clearId)
    return () => {
      clearInterval(intervalTimeKey);
      window.removeEventListener('beforeunload', clearId)
    };
  }, []);

  const getDotPosition = (value: any) => {
    return {
      transform: `translate(${value.windowX + value.windowWidth / 2}px, ${
        value.windowY + value.windowHeight / 2
      }px)`,
    } as CSSProperties;
  };

  const getCanvasPosition = () => {
    return {
      transform: `translate(${-windowX}px, ${-windowY}px)`,
      width: `${screen.width}px`,
      height: `${screen.height}px`,
    } as CSSProperties;
  };

  const getDotList = () => {
    const state = LocalStorage.getState();
    return Object.entries(state).filter(Boolean);
  };

  return (
    <div style={getCanvasPosition()} className="canvas">
      {getDotList().map((item) => {
        const [key, value] = item;
        return (
          <div className="dot" key={key} style={getDotPosition( value)}></div>
        );
      })}
    </div>
  );
}

export default App;
