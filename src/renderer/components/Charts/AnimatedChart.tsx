/* eslint-disable @typescript-eslint/no-explicit-any */
// AnimatedChart.js

import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, Line, ResponsiveContainer, YAxis} from 'recharts';
import { mkSimplexNoise } from '@spissvinkel/simplex-noise';

const AnimatedChart = () => {
  const [data, setData] = useState([{ value: 0, index: 0 }]);
  const frequency = .1; // Adjust the frequency of the Perlin noise
  const amplitude = .5; // Adjust the amplitude of the Perlin noise


  useEffect(() => {

    const noiseGenerator: any = mkSimplexNoise(Math.random);

    const intervalId = setInterval(() => {
        if (data.length >= 200) {
            clearInterval(intervalId);
            return;
          }

        const i = data.length
        const value = noiseGenerator.noise2D(frequency * i, 0)
        const scaledValue = (value + 1) * amplitude / 2; // Scale the value to fit the desired rang
    
        setData([...data, { value: scaledValue, index: data.length }]);
 
    }, 16);

    return () => clearInterval(intervalId);
  }, [data]);


  return (
      <>
        <ResponsiveContainer style={{padding: "10px"}} height='100%' width='100%'>
            <LineChart width={300} height={200} data={data}>
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
                <XAxis
                type="number"
                dataKey={"index"}
                interval="preserveStartEnd"
                domain={[0,200]}
                style={{display: "none"}}
                />
                <YAxis domain={[0,1]} style={{display: "none"}}/>
            </LineChart>
        </ResponsiveContainer>
    </>

  );
};

export default AnimatedChart;
