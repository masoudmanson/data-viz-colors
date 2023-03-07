import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { StyledHeatmapWrapper } from "./style";

const Heatmap: React.FC = (props) => {
  const colors = useSelector((state: RootState) => state.colorReducer.colors);
  const data = useSelector((state: RootState) => state.dataReducer.data);
  const x = useSelector((state: RootState) => state.dataReducer.x);
  const y = useSelector((state: RootState) => state.dataReducer.y);
  const numberOfColors = useSelector(
    (state: RootState) => state.colorReducer.numberOfColors
  );

  let xData: number[] = [...Array(x).keys()];
  let yData: number[] = [...Array(y).keys()];

  const options = {
    tooltip: {},
    grid: {
      top: 2,
      bottom: 2,
      right: 2,
      left: 2,
    },
    xAxis: {
      type: "category",
      data: xData,
      show: false,
    },
    yAxis: {
      type: "category",
      data: yData,
      show: false,
    },
    visualMap: {
      show: false,
      type: "piecewise",
      min: 0,
      max: 100,
      right: 0,
      top: 0,
      calculable: true,
      realtime: false,
      splitNumber: numberOfColors,
      inRange: {
        color: colors,
      },
    },
    series: [
      {
        name: "Heatmap",
        type: "heatmap",
        data: data,
        silent: false,
        emphasis: {
          itemStyle: {
            borderColor: "#212121",
            borderWidth: 1,
          },
        },
        progressive: 1000,
        animation: false,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
        },
      },
    ],
  };

  return (
    <StyledHeatmapWrapper>
      <h3>An example heatmap: </h3>
      <ReactECharts
        option={options}
        opts={{ renderer: "svg", width: x * 20, height: y * 20 }}
      />
    </StyledHeatmapWrapper>
  );
};

export default Heatmap;
