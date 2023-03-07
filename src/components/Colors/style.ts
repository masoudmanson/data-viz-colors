import { styled } from "@mui/material";
import { color as D3Color, RGBColor } from "d3-color";

export const StyledWrapper = styled("div")`
  display: flex;
  justify-content: start;
  flex-direction: column;
  text-align: left;
  width: fit-content;
`;

export const StyledColorsWrapper = styled("div")`
  display: inline-flex;
  justify-content: start;
  flex-wrap: wrap;
  align-items: center;
  max-width: calc(100vw - 300px);
`;

export const StyledColor = styled("span")`
  ${(props) => {
    let { color = "#000" } = props;

    let textColor =
      ColorDifference(color, "#fff") > ColorDifference(color, "#000")
        ? "white"
        : "black";

    return `
        display: inline-flex;
        height: 50px;
        width: 50px;
        min-width: 50px;
        background-color: ${color};
        border-radius: 50%;
        margin: 0 5px 10px 0;
        font-size: 9px;
        justify-content: center;
        align-items: center;
        user-select: none;
        cursor: pointer;
        transition: all .2s;
        mix-blend-mode: screen;

        :hover {
            transform: scale(1.1);
            box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
        }

        span {
          color: ${textColor};
        }
    `;
  }}
`;

export const StyledColorRange = styled("div")`
  width: 100%;
  height: 40px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: stretch;
`;

export const StyledRangeColor = styled("span")`
  ${(props) => {
    let { color = "#000" } = props;

    return `
      height: 100%;
      display: block;
      flex-grow: 1;
      cursor: pointer;
      max-width: 55px;
      background-color: ${color};
    `;
  }}
`;

function ColorDifference(color1: string, color2: string): number {
  let Color1Value = ColorValue(color1);
  let Color2Value = ColorValue(color2);

  return Math.abs(Color1Value - Color2Value);
}

function ColorValue(color: string) {
  const { r, g, b } = D3Color(color) as RGBColor;
  return Math.round((r + g + b) / 3);
}
