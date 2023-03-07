import React, { useState, useEffect } from "react";
import { ScaleLinear, scaleLinear } from "d3-scale";
import { line, curveStepAfter } from "d3-shape";
import chroma from "chroma-js";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { StyledChartWrapper } from "./style";
import { extent } from "d3-array";

interface Props {
  title: string;
  mode: number;
}

const Chart: React.FC<Props> = ({ title, mode }) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const steps = useSelector((state: RootState) => state.colorReducer.colors);

  useEffect(() => {
    setHeight(width * 0.7);
  }, [width]);

  const padding = {
    left: 30,
    right: 10,
    top: 20,
    bottom: 20,
  };

  const values = steps
    .map((c) => chroma(c).lch()[mode])
    .map(mode === 2 ? (h) => h : (d) => d);

  const values2 = values.concat(values[values.length - 1]);

  const xScale = scaleLinear()
    .domain([0, steps.length])
    .range([padding.left, width - padding.right]);

  let yDomain, yScale: ScaleLinear<number, number, never>;

  let minDomain = mode === 1 ? 80 : 50;

  yDomain = extent(values) as [number, number];
  let diff = Math.abs(yDomain[1] - yDomain[0]);
  if (diff < minDomain) {
    yDomain[0] -= (minDomain - diff) * 0.5;
    yDomain[1] += (minDomain - diff) * 0.5;
  }

  yScale = scaleLinear()
    .domain(yDomain)
    .nice()
    .rangeRound([height - padding.bottom, padding.top]);

  const y0 = yScale.domain()[0];
  const y1 = yScale.domain()[1];

  const lineGen = line()
    .x((v, i) => xScale(i))
    .y((v, i) => yScale(v as unknown as number))
    .curve(curveStepAfter);

  const path = lineGen(values2 as unknown as [number, number][]) || undefined;

  return (
    <StyledChartWrapper ref={(div) => setWidth(div?.clientWidth ?? 0)}>
      <h4>{title}</h4>
      <svg height={height || 50}>
        {values.length &&
          yScale.ticks(6).map((y) => (
            <React.Fragment key={y}>
              <text x={padding.left - 5} y={yScale(y)}>
                {y}
              </text>
              <line
                x1={padding.left}
                x2={width - padding.right}
                transform={`translate(0,${yScale(y)})`}
              />
            </React.Fragment>
          ))}
        <line
          className="direct"
          x1={padding.left}
          x2={width - padding.right}
          y1={yScale(values[0])}
          y2={yScale(values[values.length - 1])}
        />
        <path d={path} />
      </svg>
    </StyledChartWrapper>
  );
};

export default Chart;
