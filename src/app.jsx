import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Slider,
  TextField,
} from "@mui/material";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { LedMatrix } from "@app/components";
import { useRequestAnimationFrame } from "@app/hooks";
import { makeMessageMatrix } from "@app/helpers";
import { StyledLedMatrixWrapper } from "./app.styles";

const DEFAULT_MESSAGE = "Next: Deansgate-Castlefield";

export const App = () => {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [scrollingEnabled, setScrollingEnabled] = useState(false);

  // TODO: move these inside the LedMatrix component
  const [offset, setOffset] = useState(0);
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

  const callback = useCallback(
    (elapsed) => {
      console.log("[requestAnimationFrame callback]", elapsed);
      setOffset((value) => {
        const newValue = value + 1;
        return newValue < messageMatrix[0].length ? newValue : 0;
      });
    },
    [messageMatrix]
  );

  useRequestAnimationFrame(callback, scrollSpeed);

  return (
    <Container sx={{ mt: 4 }}>
      <StyledLedMatrixWrapper>
        <LedMatrix messageMatrix={messageMatrix} offset={offset} />
      </StyledLedMatrixWrapper>

      <Box
        component="form"
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4 }}
      >
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
            step={10}
          />
        </FormControl>

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
      </Box>
    </Container>
  );
};
