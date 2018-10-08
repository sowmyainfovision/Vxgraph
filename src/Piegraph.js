import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientPinkRed } from '@vx/gradient';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import { scaleQuantize } from '@vx/scale';
import { extent } from 'd3-array';



const Task =[
    { task: 'New', frequency:30 },
    { task: 'Started', frequency:50 },
    { task: 'Done', frequency:76  },
    { task: 'Overdue', frequency:314 },
    { task: 'Discarded', frequency:65 },
    ];

    
function Label({ x, y, children }) {
  return (
    <text
      fill="black"
      textAnchor="middle"
      x={x}
      y={y}
      dy=".33em"
      fontSize={16}
    >
      {children}
    </text>
  );
}

const width = 500;
const height = 500;
const margin = { top: 20, bottom: 20, left: 20, right: 20 }



 export default function Piegraph ()  {
   
    if (width < 10) return null;
  const radius = Math.min(width, height) / 2;
  return (
    <div>
    <svg width={width} height={height}>
      <GradientPinkRed id="pink"/>
      <rect
        x={0}
        y={0}
        rx={14}
        width={width}
        height={height}
        fill="url('#pink')"
      />
      
      <Group top={height / 2 - margin.top} left={width / 2}>
      
     <Pie
          data={Task}
          pieValue={d => d.frequency}
          outerRadius={radius - 50}
          innerRadius={radius - 120}
          fill="#e2f442"
          fillOpacity={d => 1 / (d.index + 2) }
          cornerRadius={3}
          stroke="white"
          strokeWidth={0.7}
          padAngle={0}
          centroid={(centroid, arc) => {
                        const [x, y] = centroid;
                        const { startAngle, endAngle } = arc;
            if (endAngle - startAngle < .1) return null;
                        return <Label x={x} y={y}> {arc.data.task} </Label>;
                         
                                  }}
                                      />

                                      <Pie
          data={Task}
          pieValue={d => d.frequency}
          outerRadius={radius - 135}
          fill="white"
          fillOpacity={d => 1 / (d.index + 2) }
          centroid={(centroid, arc) => {
            const [x, y] = centroid;
            return <Label x={x} y={y}>{arc.data.frequency}</Label>;
          }}
        />
       </Group>
        
    </svg>

</div>
 );
   }

