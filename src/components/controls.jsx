import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Slider,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { StyledBox, StyledIcons } from "./controls.styles";

export const Controls = ({
  message,
  onChangeMessage,
  scrollSpeed,
  onChangeScrollSpeed,
  scrollingEnabled,
  setScrollingEnabled,
  staggeredScrolling,
  onChangeStaggeredScrolling,
  onEnterFullscreen,
}) => {
  return (
    <StyledBox>
      <FormControl>
        <FormLabel htmlFor="message">Message</FormLabel>
        <TextField
          autoComplete="off"
          name="message"
          variant="standard"
          value={message}
          onChange={onChangeMessage}
          fullWidth
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="scrollSpeed">Scroll Speed</FormLabel>
        <Slider
          name="scrollSpeed"
          sx={{ width: "100%" }}
          value={scrollSpeed}
          onChange={onChangeScrollSpeed}
          valueLabelDisplay="auto"
          min={0}
          max={50}
        />
      </FormControl>

      <StyledIcons>
        {scrollingEnabled ? (
          <Tooltip title="Pause scrolling">
            <PauseCircleIcon
              fontSize="large"
              onClick={() => setScrollingEnabled(false)}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Resume scrolling">
            <PlayCircleIcon
              fontSize="large"
              onClick={() => setScrollingEnabled(true)}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        )}

        <Tooltip title="Enter fullscreen">
          <FullscreenIcon
            fontSize="large"
            onClick={onEnterFullscreen}
            style={{ cursor: "pointer" }}
          />
        </Tooltip>

        <FormControlLabel
          control={
            <Switch
              checked={staggeredScrolling}
              onChange={onChangeStaggeredScrolling}
              name="staggeredScrolling"
            />
          }
          label="Staggered Scrolling"
        />
      </StyledIcons>
    </StyledBox>
  );
};
