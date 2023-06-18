import { useState, useMemo, useEffect } from 'react';
import ReactGridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const dummyData = [{ i: 'a', x: 0, y: 0, w: 20, h: 1 }];

const A4 = () => {
  const [dataLayout, setDataLayout] = useState(dummyData);
  const [newCounter, setNewCounter] = useState(0);

  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

  const addComponentHandler = () => {
    setDataLayout([
      ...dataLayout,
      {
        i: `n${newCounter}`,
        x: (dataLayout.length * 2) % 12,
        y: Infinity,
        w: 20,
        h: 3,
      },
    ]);
    setNewCounter((prev) => prev + 1);
  };

  useEffect(() => {
    console.log('dataLayout', dataLayout);
  }, [dataLayout]);

  return (
    <>
      <button onClick={addComponentHandler}>Add Component</button>
      <div
        style={{
          // width: '210mm', // A4 paper width
          // height: '297mm', // A4 paper height
          width: '21cm', // A4 paper width
          minHeight: '29.7cm', // A4 paper height
          maxHeight: '29.7cm', // A4 paper height
          // margin: 'auto',
          // border: '1px solid black', // border for visual representation
          padding: '0.5cm',
          margin: '1cm auto',
          background: '#fff',
          boxShadow: '0 4px 5px rgba(75, 75, 75, 0.2)',
          outline: 0,
        }}
      >
        <ReactGridLayout
          // {/* <ResponsiveGridLayout */}
          className="layout"
          layout={dataLayout}
          // breakpoints={{ lg: 1200 }}
          // cols={{ lg: 50 }}
          cols={100}
          rowHeight={30}
          width={755}
          onLayoutChange={(layout) => setDataLayout(layout)}
          allowOverlap
          maxRows={36}
          margin={[0, 0]}
        >
          {dataLayout.map((item) => (
            <div key={item.i}>{item.i}</div>
          ))}
          {/* </ResponsiveGridLayout> */}
        </ReactGridLayout>
      </div>
    </>
  );
};

export default A4;
