import { styled } from "@mui/material";

export const StyledChartWrapper = styled("div")`
  h4 {
    font-size: 1rem;
  }
  svg {
    width: 100%;
  }
  path {
    fill: none;
    stroke: black;
    stroke-width: 2;
  }
  text {
    dominant-baseline: central;
    font-size: 13px;
    text-anchor: end;
  }
  line {
    fill: none;
    stroke: #ddd;
  }
  line.direct {
    stroke-width: 2;
    stroke: #ccc;
    stroke-dasharray: 6, 4;
  }
`;
