import { FormControlLabel, Switch, Tooltip } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { LedMatrixContainer } from "./led-matrix-container";
import { Version } from "./version";
import { StyledFullscreenView, StyledIcons } from "./fullscreen-view.styles";

export const FullscreenView = ({
  message,
  font,
  scrollSpeed,
  scrollingEnabled,
  setScrollingEnabled,
  staggeredScrolling,
  onChangeStaggeredScrolling,
  exitFullscreen,
}) => {
  return (
    <StyledFullscreenView>
      <LedMatrixContainer
        message={message}
        font={font}
        scrollSpeed={scrollSpeed}
        scrollingEnabled={scrollingEnabled}
        staggeredScrolling={staggeredScrolling}
      />
      <StyledIcons>
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
      <Version />
    </StyledFullscreenView>
  );
};
