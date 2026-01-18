import { Container } from "@mui/material";

import { Controls } from "./controls";
import { LedMatrixContainer } from "./led-matrix-container";
import { Version } from "./version";

export const NormalView = ({
  message,
  font,
  onChangeMessage,
  scrollSpeed,
  onChangeScrollSpeed,
  scrollingEnabled,
  setScrollingEnabled,
  enterFullscreen,
}) => {
  return (
    <Container sx={{ mt: 2 }}>
      <LedMatrixContainer
        message={message}
        font={font}
        scrollSpeed={scrollSpeed}
        scrollingEnabled={scrollingEnabled}
      />
      <Controls
        message={message}
        onChangeMessage={onChangeMessage}
        scrollSpeed={scrollSpeed}
        onChangeScrollSpeed={onChangeScrollSpeed}
        scrollingEnabled={scrollingEnabled}
        setScrollingEnabled={setScrollingEnabled}
        onEnterFullscreen={enterFullscreen}
      />
      <Version />
    </Container>
  );
};
