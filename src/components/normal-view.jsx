import { Container } from "@mui/material";

import { Controls, LedMatrixPhaser, Version } from "@app/components";

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
      <LedMatrixPhaser
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
