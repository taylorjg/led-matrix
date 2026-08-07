import {
  FullscreenExit as FullscreenExitIcon,
  PauseCircle as PauseCircleIcon,
  PlayCircle as PlayCircleIcon,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

import { LedMatrixContainer } from "./led-matrix-container";
import { Version } from "./version";
import { StyledFullscreenView, StyledIcons } from "./fullscreen-view.styles";

export const FullscreenView = ({
  message,
  font,
  scrollSpeed,
  scrollingEnabled,
  setScrollingEnabled,
  exitFullscreen,
}) => {
  return (
    <StyledFullscreenView>
      <LedMatrixContainer
        message={message}
        font={font}
        scrollSpeed={scrollSpeed}
        scrollingEnabled={scrollingEnabled}
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
      </StyledIcons>
      <Version />
    </StyledFullscreenView>
  );
};
