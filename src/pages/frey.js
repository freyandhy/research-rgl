import Layout from '@/layout/Layout';
import { useState, useEffect } from 'react';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const dummyData = [{ i: 'a', x: 0, y: 0, w: 2, h: 4 }];

const Frey = () => {
  const [dataLayout, setDataLayout] = useState(dummyData);
  const [newCounter, setNewCounter] = useState(0);

  const addComponentHandler = () => {
    console.log('Component Add!');
    setDataLayout([
      ...dataLayout,
      {
        i: `n${newCounter}`,
        x: (dataLayout.length * 2) % 12,
        y: Infinity,
        w: 2,
        h: 4,
      },
    ]);
    setNewCounter((prev) => prev + 1);
  };

  useEffect(() => {
    console.log('dataLayout', dataLayout);

    // return () => {
    //   second
    // }
  }, [dataLayout]);

  return (
    <Layout>
      <div>
        <button onClick={addComponentHandler}>Add Component</button>
        <ReactGridLayout
          className="layout"
          layout={dataLayout}
          cols={12}
          rowHeight={30}
          width={1200}
          onLayoutChange={(layout) => setDataLayout(layout)}
          autoSize
          allowOverlap
        >
          {dataLayout.map((item) => (
            <div key={item.i}>{item.i}</div>
          ))}
        </ReactGridLayout>
      </div>
    </Layout>
  );
};

export default Frey;
