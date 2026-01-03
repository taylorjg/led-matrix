import { Container } from "@mui/material";

import { Controls } from "./controls";
import { LedMatrixContainer } from "./led-matrix-container";
import { Version } from "./version";

export const NormalView = ({
  message,
  onChangeMessage,
  scrollSpeed,
  onChangeScrollSpeed,
  scrollingEnabled,
  setScrollingEnabled,
  staggeredScrolling,
  onChangeStaggeredScrolling,
  enterFullscreen,
}) => {
  return (
    <Container sx={{ mt: 2 }}>
      <LedMatrixContainer
        message={message}
        scrollSpeed={scrollSpeed}
        scrollingEnabled={scrollingEnabled}
        staggeredScrolling={staggeredScrolling}
      />
      <Controls
        message={message}
        onChangeMessage={onChangeMessage}
        scrollSpeed={scrollSpeed}
        onChangeScrollSpeed={onChangeScrollSpeed}
        scrollingEnabled={scrollingEnabled}
        setScrollingEnabled={setScrollingEnabled}
        staggeredScrolling={staggeredScrolling}
        onChangeStaggeredScrolling={onChangeStaggeredScrolling}
        onEnterFullscreen={enterFullscreen}
      />
      <Version />
    </Container>
  );
};
