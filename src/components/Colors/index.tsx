import { Tooltip } from "czifui";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  StyledColor,
  StyledColorRange,
  StyledColorsWrapper,
  StyledRangeColor,
  StyledWrapper,
} from "./style";

const Colors = () => {
  const colors = useSelector((state: RootState) => state.colorReducer.colors);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <StyledWrapper>
      <h3>Generated Color Map:</h3>
      <StyledColorsWrapper>
        {colors.map((color) => (
          <StyledColor
            color={color}
            key={color}
            onClick={(event) => handleColorClick(event, color)}
          >
            <span>{color.toUpperCase()}</span>
          </StyledColor>
        ))}
      </StyledColorsWrapper>

      <StyledColorRange>
        {colors.map((color) => (
          <Tooltip
            key={color}
            sdsStyle="dark"
            title={color}
            leaveDelay={0}
            subtitle="Click to copy!"
          >
            <StyledRangeColor
              color={color}
              onClick={(event) => handleColorClick(event, color)}
            />
          </Tooltip>
        ))}
      </StyledColorRange>
    </StyledWrapper>
  );

  function handleColorClick(event: React.SyntheticEvent, color: string) {
    navigator.clipboard.writeText(color);

    enqueueSnackbar(`${color} has been copied to the clipboard!`, {
      variant: "success",
    });
  }
};

export default Colors;
