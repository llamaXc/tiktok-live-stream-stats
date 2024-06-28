/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useMemo} from 'react';
import './LineChart.scss'
import { AreaChart, CartesianGrid, Area, YAxis, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { Container, Box, Typography } from '@mui/material';

interface LineChartProps{
    minuteData: any[],
    clampYAxisValues?: boolean,
}


const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;

    const timestamp = new Date(payload.value);

    const formattedTime = useMemo(() => {
        const hours = timestamp.getHours().toString().padStart(2, '0');
        const minutes = timestamp.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      }, [timestamp]);

    return (
      <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-25)"  fontSize={12}>
          {formattedTime}
        </text>
      </g>
    );
  };

  const CustomYAxisTick = (props: any) => {
    const { x, y, payload } = props;
    let displayValue = payload.value

    if (payload.value < 1000){
        displayValue = payload.value
    }else if (payload.value < 10000){
        displayValue = (payload.value / 1000).toFixed(1) + "K"
    }else if(payload.value < 1000000){
        displayValue = (payload.value / 1000).toFixed() + "K"
    }else{
        displayValue = (payload.value / 1000000).toFixed(1) + "M"
    }
    return <text x={x} y={y} dy={16} textAnchor="end" fill="#666">{`${displayValue}`}</text>;
  };


const numTicks = 10


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

const BasicLineChart: React.FC<LineChartProps> = ({minuteData, clampYAxisValues=false}) => {

    if (minuteData.length === 0){
        return (
        <Container >
            <Typography>Waiting for event from TikTok</Typography>
        </Container>
        )
    }

    return (
        <>
            <ResponsiveContainer style={{padding: "0px", marginLeft: "10px"}}>
                <AreaChart data={minuteData}>
                    <YAxis  tick={<CustomYAxisTick />}/>
                    <Tooltip content={<CustomTooltip />} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp"  interval={Math.round(minuteData.length / numTicks)} tick={<CustomXAxisTick />}/>
                    <Area isAnimationActive={false} type="monotone" dataKey="value" stroke="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}

export default BasicLineChart