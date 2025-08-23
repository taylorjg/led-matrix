import { useState } from "react";
import { Container, Tooltip } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import { Controls, LedMatrix, Version } from "@app/components";
import { useFullscreen } from "@app/hooks";

import { StyledFullscreenExitIcon, StyledLedMatrixWrapper } from "./app.styles";

const DEFAULT_MESSAGE = "Next: Deansgate-Castlefield";

export const App = () => {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [scrollSpeed, setScrollSpeed] = useState(Math.round((1000 / 60) * 5));
  const [scrollingEnabled, setScrollingEnabled] = useState(false);
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const onChangeScrollSpeed = (_event, value) => {
    setScrollSpeed(value);
  };

  return (
    <Container sx={{ mt: 2 }}>
      <StyledLedMatrixWrapper>
        <LedMatrix
          message={message}
          scrollSpeed={scrollSpeed}
          scrollingEnabled={scrollingEnabled}
        />
      </StyledLedMatrixWrapper>

      {isFullscreen ? (
        <Tooltip title="Exit fullscreen">
          <StyledFullscreenExitIcon>
            <FullscreenExitIcon onClick={exitFullscreen} />
          </StyledFullscreenExitIcon>
        </Tooltip>
      ) : (
        <Controls
          message={message}
          onChangeMessage={onChangeMessage}
          scrollSpeed={scrollSpeed}
          onChangeScrollSpeed={onChangeScrollSpeed}
          scrollingEnabled={scrollingEnabled}
          setScrollingEnabled={setScrollingEnabled}
          onEnterFullscreen={enterFullscreen}
        />
      )}
      <Version />
    </Container>
  );
};
