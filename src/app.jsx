import { useEffect, useState } from "react";
import { Container, Tooltip } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import { Controls, LedMatrix, Version } from "@app/components";

import { StyledLedMatrixWrapper } from "./app.styles";

const DEFAULT_MESSAGE = "Next: Deansgate-Castlefield";

export const App = () => {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [scrollSpeed, setScrollSpeed] = useState(Math.round((1000 / 60) * 5));
  const [scrollingEnabled, setScrollingEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const onChangeScrollSpeed = (_event, value) => {
    setScrollSpeed(value);
  };

  const onEnterFullscreen = () => {
    document.documentElement.requestFullscreen();
  };

  const onExitFullscreen = () => {
    document.exitFullscreen();
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
          <FullscreenExitIcon
            onClick={onExitFullscreen}
            style={{
              cursor: "pointer",
              position: "fixed",
              bottom: `0.5rem`,
              left: `0.5rem`,
            }}
          />
        </Tooltip>
      ) : (
        <Controls
          message={message}
          onChangeMessage={onChangeMessage}
          scrollSpeed={scrollSpeed}
          onChangeScrollSpeed={onChangeScrollSpeed}
          scrollingEnabled={scrollingEnabled}
          setScrollingEnabled={setScrollingEnabled}
          onEnterFullscreen={onEnterFullscreen}
        />
      )}
      <Version />
    </Container>
  );
};
