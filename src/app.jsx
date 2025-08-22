import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Slider,
  TextField,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { LedMatrix, Version } from "@app/components";
import { useRequestAnimationFrame } from "@app/hooks";
import { makeMessageMatrix } from "@app/helpers";
import { StyledLedMatrixWrapper } from "./app.styles";

const DEFAULT_MESSAGE = "Next: Deansgate-Castlefield";
const GAP = 2;

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

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const onChangeScrollSpeed = (_event, value) => {
    setScrollSpeed(value);
  };

  const onFullscreen = () => {
    document.documentElement.requestFullscreen().then(() => {
      setIsFullscreen(true);
    });
  };

  const onFullscreenExit = () => {
    document.exitFullscreen().then(() => {
      setIsFullscreen(false);
    });
  };

  const callback = useCallback((elapsed) => {
    console.log("[requestAnimationFrame callback]", elapsed);
    setElapsed(elapsed);
  }, []);

  useRequestAnimationFrame(callback, scrollSpeed);

  return (
    <>
      <Container sx={{ mt: GAP }}>
        <StyledLedMatrixWrapper>
          <LedMatrix
            messageMatrix={messageMatrix}
            elapsed={elapsed}
            scrollSpeed={scrollSpeed}
          />
        </StyledLedMatrixWrapper>

        <Box
          component="form"
          sx={{
            mt: GAP,
            display: "flex",
            flexDirection: "column",
            gap: GAP * 2,
          }}
        >
          {isFullscreen ? (
            <FullscreenExitIcon fontSize="large" onClick={onFullscreenExit} />
          ) : (
            <>
              <FormControl>
                <FormLabel htmlFor="message">Message</FormLabel>
                <TextField
                  name="message"
                  variant="standard"
                  value={message}
                  onChange={onChangeMessage}
                  fullWidth
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="scrollSpeed">Scroll Speed (ms)</FormLabel>
                <Slider
                  name="scrollSpeed"
                  sx={{ width: 300 }}
                  value={scrollSpeed}
                  onChange={onChangeScrollSpeed}
                  valueLabelDisplay="auto"
                  min={0}
                  max={250}
                />
              </FormControl>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {scrollingEnabled ? (
                  <PauseCircleIcon
                    fontSize="large"
                    onClick={() => setScrollingEnabled(false)}
                  />
                ) : (
                  <PlayCircleIcon
                    fontSize="large"
                    onClick={() => setScrollingEnabled(true)}
                  />
                )}

                <FullscreenIcon fontSize="large" onClick={onFullscreen} />
              </div>
            </>
          )}
        </Box>
      </Container>
      <Version />
    </>
  );
};
