import { useState } from "react";

import { FullscreenView, NormalView } from "@app/components";
import { useFullscreen } from "@app/hooks";

const DEFAULT_MESSAGE = "Next: Deansgate-Castlefield";

export const App = () => {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [scrollSpeed, setScrollSpeed] = useState(25);
  const [scrollingEnabled, setScrollingEnabled] = useState(true);
  const [staggeredScrolling, setStaggeredScrolling] = useState(false);
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const onChangeScrollSpeed = (_event, value) => {
    setScrollSpeed(value);
  };

  const onChangeStaggeredScrolling = (_event, value) => {
    setStaggeredScrolling(value);
  };

  return isFullscreen ? (
    <FullscreenView
      message={message}
      scrollSpeed={scrollSpeed}
      scrollingEnabled={scrollingEnabled}
      staggeredScrolling={staggeredScrolling}
      setScrollingEnabled={setScrollingEnabled}
      onChangeStaggeredScrolling={onChangeStaggeredScrolling}
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
      staggeredScrolling={staggeredScrolling}
      onChangeStaggeredScrolling={onChangeStaggeredScrolling}
      enterFullscreen={enterFullscreen}
    />
  );
};
