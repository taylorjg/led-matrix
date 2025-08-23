import { Tooltip } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { LedMatrix, Version } from "@app/components";

import { StyledFullscreenView, StyledIcons } from "./fullscreen-view.styles";

export const FullscreenView = ({
  message,
  scrollSpeed,
  scrollingEnabled,
  setScrollingEnabled,
  exitFullscreen,
}) => {
  return (
    <StyledFullscreenView>
      <LedMatrix
        message={message}
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
