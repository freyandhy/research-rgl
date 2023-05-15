import Chart from "@/components/Chart";
import Layout from "@/layout/Layout";
import React from "react";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const chartBar1 = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
};

const chartBar2 = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [
        120,
        {
          value: 200,
          itemStyle: {
            color: "#a90000",
          },
        },
        150,
        80,
        70,
        110,
        130,
      ],
      type: "bar",
    },
  ],
};

const chartLine = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};

const dummyData = [
  {
    w: 4,
    h: 7,
    x: 0,
    y: 0,
    i: "chart1",
    chart: chartBar1,
  },
];

export default function Home() {
  const [dataLayout, setDataLayout] = React.useState(dummyData);
  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <div
          className="draggable-box"
          draggable={true}
          unselectable="on"
          onDragStart={(e) => {
            e.dataTransfer.clearData();
            e.dataTransfer.setData("text/plain", "bar");
            e.currentTarget.classList.add("is-drag");
          }}
          onDragEnd={(e) => {
            e.currentTarget.classList.remove("is-drag");
          }}
        />
        <div
          className="draggable-box line"
          draggable={true}
          unselectable="on"
          onDragStart={(e) => {
            e.dataTransfer.clearData();
            e.dataTransfer.setData("text/plain", "line");
            e.currentTarget.classList.add("is-drag");
          }}
          onDragEnd={(e) => {
            e.currentTarget.classList.remove("is-drag");
          }}
        />
      </div>
      <ReactGridLayout
        className="layout"
        layout={dataLayout}
        cols={12}
        rowHeight={30}
        width={1200}
        preventCollision={true}
        onDrop={(layout, item, e) => {
          const type = e.dataTransfer.getData("text");
          setDataLayout([
            { ...item, chart: type === "bar" ? chartBar1 : chartLine },
            ...dataLayout,
          ]);
        }}
        droppingItem={{
          i: (Math.random() + 1).toString(36).substring(7),
          w: 4,
          h: 7,
        }}
        autoSize={true}
        isDroppable
      >
        {dataLayout.map((data) => {
          return (
            <div key={data.i}>
              {data.chart && <Chart options={data.chart} />}
            </div>
          );
        })}
      </ReactGridLayout>
    </Layout>
  );
}
