import { useRef, useState } from 'react';
import Moveable from 'react-moveable';
import Chart from '@/components/Chart';

const snapDirections = {
  left: true,
  top: true,
  right: true,
  bottom: true,
  center: true,
  middle: true,
};

const elementSnapDirections = {
  left: true,
  top: true,
  right: true,
  bottom: true,
  center: true,
  middle: true,
};

const dummyData = [
  {
    id: 'target1',
    content: 'Target 1',
    type: 'text',
    width: '100px',
    height: '100px',
    left: '100px',
    top: '100px',
  },
  {
    id: 'target2',
    content: 'Target 2',
    type: 'text',
    width: '300px',
    height: '150px',
    left: '300px',
    top: '200px',
  },
  // {
  //   id: 'target3',
  //   content: 'Target 3',
  //   type: 'text',
  //   width: '100px',
  //   height: '100px',
  //   left: '600px',
  //   top: '450px',
  // },
  {
    id: 'target4',
    content: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    },
    type: 'chart',
    width: '450px',
    height: '300px',
    left: '50px',
    top: '300px',
  },
  {
    id: 'target5',
    content: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [
            120,
            {
              value: 200,
              itemStyle: {
                color: '#a90000',
              },
            },
            150,
            80,
            70,
            110,
            130,
          ],
          type: 'bar',
        },
      ],
    },
    type: 'chart',
    width: '450px',
    height: '300px',
    left: '300px',
    top: '650px',
  },
];

const Snap = () => {
  // const targetRef = useRef(null);
  // const moveableRef = useRef(null);

  const [dataLayout, setDataLayout] = useState(dummyData);
  const [newCounter, setNewCounter] = useState(0);
  const allElement = dataLayout.map((item) => `.${item.id}`);

  const addElementHandler = () => {
    console.log('Element Add!');
    setDataLayout([
      ...dataLayout,
      {
        id: `element${newCounter}`,
        content: `ini isi content element${newCounter}`,
        type: 'text',
        width: '150px',
        height: '50px',
        left: '100px',
        top: '100px',
      },
    ]);
    setNewCounter((prev) => prev + 1);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <button onClick={addElementHandler}>Add Element</button>
      </div>
      <div
        className="paper"
        style={{
          width: '21cm', // A4 paper width
          minHeight: '29.7cm', // A4 paper height
          maxHeight: '29.7cm', // A4 paper height
          padding: '0.5cm',
          margin: '1cm auto',
          background: '#fff',
          boxShadow: '0 4px 5px rgba(75, 75, 75, 0.2)',
          outline: 0,
          position: 'relative',
        }}
      >
        {dataLayout.map((item) => {
          const { id, content, type, ...style } = item;
          return (
            <div key={id} className={`target ${id}`} style={style}>
              {type === 'text' && content}
              {type === 'chart' && <Chart options={content} />}
            </div>
          );
        })}
        <Moveable
          // ref={moveableRef}
          // target={targetRef}
          target={'.target'}
          individualGroupable
          draggable
          resizable
          rotatable
          snappable
          isDisplaySnapDigit
          maxSnapElementGuidelineDistance={300}
          edgeDraggable={true}
          elementGuidelines={['.paper', ...allElement]}
          snapContainer={'.paper'}
          snapDirections={snapDirections}
          elementSnapDirections={elementSnapDirections}
          verticalGuidelines={[100]}
          horizontalGuidelines={[100]}
          onRender={(e) => {
            console.log(e.cssText);
            e.target.style.cssText += e.cssText;
          }}
          // onDrag={(e) => {
          //   e.target.style.transform = e.transform;
          // }}
        />
      </div>
    </>
  );
};

export default Snap;
