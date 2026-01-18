import { useState } from "react";

import { FullscreenView, NormalView } from "@app/components";
import { useFullscreen } from "@app/hooks";
import { fonts } from "./fonts";

const DEFAULT_MESSAGE = "Next: Deansgate-Castlefield";
const DEFAULT_FONT = fonts[1];
const DEFAULT_SPEED = 30;

export const App = () => {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [font] = useState(DEFAULT_FONT);
  const [scrollSpeed, setScrollSpeed] = useState(DEFAULT_SPEED);
  const [scrollingEnabled, setScrollingEnabled] = useState(true);
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const onChangeScrollSpeed = (_event, value) => {
    setScrollSpeed(value);
  };

  return isFullscreen ? (
    <FullscreenView
      message={message}
      font={font}
      scrollSpeed={scrollSpeed}
      scrollingEnabled={scrollingEnabled}
      setScrollingEnabled={setScrollingEnabled}
      exitFullscreen={exitFullscreen}
    />
  ) : (
    <NormalView
      message={message}
      font={font}
      onChangeMessage={onChangeMessage}
      scrollSpeed={scrollSpeed}
      onChangeScrollSpeed={onChangeScrollSpeed}
      scrollingEnabled={scrollingEnabled}
      setScrollingEnabled={setScrollingEnabled}
      enterFullscreen={enterFullscreen}
    />
  );
};
