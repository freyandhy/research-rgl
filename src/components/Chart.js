import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GridComponent } from "echarts/components";
import { BarChart, LineChart } from "echarts/charts";
echarts.use([GridComponent, BarChart, LineChart, CanvasRenderer]);

const Chart = ({ options }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactEChartsCore
        className="echart-item"
        echarts={echarts}
        option={options}
        notMerge={true}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
};

export default Chart;
