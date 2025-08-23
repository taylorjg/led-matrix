import { useState } from "react";
import { Container, Tooltip } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { Controls, LedMatrix, Version } from "@app/components";
import { useFullscreen } from "@app/hooks";

import { StyledFullscreenExitIcon } from "./app.styles";

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

  return isFullscreen ? (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LedMatrix
          message={message}
          scrollSpeed={scrollSpeed}
          scrollingEnabled={scrollingEnabled}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          position: "fixed",
          bottom: "0.5rem",
          left: "0.5rem",
        }}
      >
        {scrollingEnabled ? (
          <Tooltip title="Pause scrolling">
            <PauseCircleIcon
              onClick={() => setScrollingEnabled(false)}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Resume scrolling">
            <PlayCircleIcon
              onClick={() => setScrollingEnabled(true)}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        )}
        <Tooltip title="Exit fullscreen">
          <FullscreenExitIcon onClick={exitFullscreen} />
        </Tooltip>
      </div>
      <Version />
    </>
  ) : (
    <Container sx={{ mt: 2 }}>
      <LedMatrix
        message={message}
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
