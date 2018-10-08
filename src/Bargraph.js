import React from 'react';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import { scaleLinear, scaleBand } from '@vx/scale';
import { GradientTealBlue } from '@vx/gradient';
import { extent, max } from 'd3-array';
import ReactDOM from 'react-dom';
import { scaleOrdinal } from '@vx/scale';
import { schemeSet1 } from 'd3-scale-chromatic';


const taskcount =[
  { task: 'New', frequency:30 },
  { task: 'Started', frequency:50 },
  { task: 'Done', frequency:76  },
  { task: 'Overdue', frequency:314 },
  { task: 'Discarded', frequency:65 },
  ];

const data = taskcount;

// Define the graph dimensions and margins
const width = 500;
const height = 500;
const margin = { top: 20, bottom: 20, left: 20, right: 20 };

// Then we'll create some bounds
const xMax = width - margin.left - margin.right;
const yMax =height - 100;

// We'll make some helpers to get at the data we want
const x = d => d.task;
const y = d => d.frequency;

// And then scale the graph by our data
const xScale = scaleBand({
  rangeRound: [0, xMax],
  domain: data.map(x),
  padding: 0.4,
});
const yScale = scaleLinear({
  rangeRound: [yMax, 0],
  domain: [0, Math.max(...data.map(y))],
});

// Compose together the scale and accessor functions to get point functions
const compose = (scale, accessor) => (data) => scale(accessor(data));
const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);


// Finally we'll embed it all in an SVG
export default function BarGraph(props) {
  return (
    <svg width={width} height={height}>
          <GradientTealBlue id="teal" />
      <rect
        x={0}
        y={0}
        rx={14}
        width={width}
        height={height}
        fill="url('#teal')"
      />

            <Group top={40}>
                 {data.map((d, i) => {
        const barHeight = yMax - yPoint(d);
       
        return (
          <Group key={`bar-${i}`} left={10} top={margin.top}>
            <Bar
              x={xPoint(d)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="rgba(23, 233, 217, .5)"
              data={{ x: x(d), y: y(d) }}
              stroke={'black'}
              strokeWidth={1}
                         />
                        
            <text x={xScale(x(d))} y={yMax - barHeight} fill="white" fontSize={20} dy={'-.2em'}>
              {y(d)}
            </text>
            <text x={xScale(x(d))} y={yMax} fill="white" fontSize={17} dx={'.32em'} dy={'1em'}>
              {x(d)}
            </text>
          </Group>
        );

              })}

            </Group>
    </svg>
  );
}
