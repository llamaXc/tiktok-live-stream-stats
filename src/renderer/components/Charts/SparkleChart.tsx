/* eslint-disable @typescript-eslint/no-explicit-any */
// AnimatedChart.js

import React from 'react';
import { LineChart, XAxis, Line, ResponsiveContainer, Tooltip, YAxis, Label, Layer} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {

    if (active && payload && payload.length) {
        const dataPoint = payload[0];
        return (
            <div className="custom-tooltip">
            <p>{`Value: ${Math.floor(dataPoint.value)}`}</p>
            </div>
        );
    }
    return null;
  };



const SparkleChart: React.FC<{minuteData: any}> = ({minuteData}) => {

    

  return (
      <>
            <ResponsiveContainer style={{padding: "0px", marginLeft: "10px"}}>
            <LineChart width={300} height={200} data={minuteData}>
            <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={5}
                animationDuration={1000}
                dot={false}
                activeDot={{ stroke: 'none', fill: '#8884d8', r: 8 }}
                isAnimationActive={false} // Disable animation for the sparkle effect
            />      
            <YAxis domain={[0,10]}/>
            <XAxis domain={[0,100]}/>

             <Tooltip content={<CustomTooltip />} />

            </LineChart>
        </ResponsiveContainer>
    </>

  );
};

export default SparkleChart;
