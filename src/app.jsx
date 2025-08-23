import { useState } from "react";

import { FullscreenView, NormalView } from "@app/components";
import { useFullscreen } from "@app/hooks";

const DEFAULT_MESSAGE = "Next: Deansgate-Castlefield";

export const App = () => {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [scrollSpeed, setScrollSpeed] = useState(15);
  const [scrollingEnabled, setScrollingEnabled] = useState(false);
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
      scrollSpeed={scrollSpeed}
      scrollingEnabled={scrollingEnabled}
      setScrollingEnabled={setScrollingEnabled}
      exitFullscreen={exitFullscreen}
    />
  ) : (
    <NormalView
      message={message}
      onChangeMessage={onChangeMessage}
      scrollSpeed={scrollSpeed}
      onChangeScrollSpeed={onChangeScrollSpeed}
      scrollingEnabled={scrollingEnabled}
      setScrollingEnabled={setScrollingEnabled}
      enterFullscreen={enterFullscreen}
    />
  );
};
