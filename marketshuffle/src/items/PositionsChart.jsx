import * as React from 'react';
import Box from '@mui/material/Box';

import { LineChart } from '@mui/x-charts/LineChart';

const test = [
    {
        cost: 300,
        date: new Date(2023, 3, 20),
        details: ""
    },
    {
        cost: 500,
        date: new Date(2023, 3, 24),
        details: ""
    }
]

const costs = test.map(item => item.cost);
const dates = test.map(item => item.date);

export default function PositionsChart({positions}) {
    return (
        <Box sx={{ width: 500, maxWidth: 500 }}>
            <LineChart
                xAxis={[
                    {
                        ...xAxisCommon,
                        id: 'bottomAxis',
                        scaleType: 'point',
                    },
                ]}
                yAxis={[
                    {
                        ...yAxisCommon,
                        id: 'rightAxis',
                        scaleType: 'point'
                    }
                ]}
                {...config}
            />
        </Box>
    );
}

const valueFormatter = (date) =>
    date.toLocaleDateString('en-EN', {
        month: '2-digit',
        day: '2-digit',
    });

const timeData = [
    ...dates
];

const costData = [
   ...costs
];


const showMark = (params) => {
    const { position } = params;
    return position.getHours() === 0;
};

const config = {
    series: [
        { data: costData, showMark },
    ],
    height: 300,
    bottomAxis: 'bottomAxis',
    rightAxis: 'rightAxis',
    leftAxis: null,
};
const xAxisCommon = {
    data: timeData,
    scaleType: 'time',
    valueFormatter,
};
const yAxisCommon = {
    data: costData,
    scaleType: 'linear',
};