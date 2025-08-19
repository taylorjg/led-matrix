import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Slider,
  TextField,
} from "@mui/material";

import { LedMatrix } from "@app/components";
import { useRequestAnimationFrame } from "@app/hooks";
import { makeMessageMatrix } from "@app/helpers";

const DEFAULT_MESSAGE = "Next: Deansgate-Castlefield";

export const App = () => {
  const [offset, setOffset] = useState(0);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [messageMatrix, setMessageMatrix] = useState(["".repeat(11)]);

  useEffect(() => {
    console.log("[App]", "useEffect for message");
    setMessageMatrix(makeMessageMatrix(message));
  }, [message]);

  const onChangeMessage = (event, value) => {
    console.log("[App] onChangeMessage", value);
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
      <div style={{ height: "10vh" }}>
        <LedMatrix messageMatrix={messageMatrix} offset={offset} />
      </div>
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
            max={500}
            step={10}
          />
        </FormControl>
      </Box>
    </Container>
  );
};
