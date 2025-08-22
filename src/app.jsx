import { useCallback, useEffect, useState } from "react";
import { Container, Tooltip } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import { Controls, LedMatrix, Version } from "@app/components";
import { useRequestAnimationFrame } from "@app/hooks";
import { makeMessageMatrix } from "@app/helpers";

import { StyledLedMatrixWrapper } from "./app.styles";

const DEFAULT_MESSAGE = "Next: Deansgate-Castlefield";

export const App = () => {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [scrollSpeed, setScrollSpeed] = useState(100);
  const [scrollingEnabled, setScrollingEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // TODO: move these inside the LedMatrix component
  const [elapsed, setElapsed] = useState(0);
  const [messageMatrix, setMessageMatrix] = useState(["".repeat(11)]);

  useEffect(() => {
    setMessageMatrix(makeMessageMatrix(message));
  }, [message]);

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

  const callback = useCallback((elapsed) => {
    console.log("[requestAnimationFrame callback]", elapsed);
    setElapsed(elapsed);
  }, []);

  useRequestAnimationFrame(callback, scrollSpeed);

  return (
    <>
      <Container sx={{ mt: 2 }}>
        <StyledLedMatrixWrapper>
          <LedMatrix
            messageMatrix={messageMatrix}
            elapsed={elapsed}
            scrollSpeed={scrollSpeed}
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
      </Container>
      <Version />
    </>
  );
};
