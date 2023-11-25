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
];

const costs = test.map(item => item.cost);
const dates = test.map(item => item.date);

export default function PositionsChart({ positions }) {
    const timeData = dates.map(date => date); // Convert dates to milliseconds

    const costData = dates.map((date, index) => ({
        x: date.getTime(), // x value represents time in milliseconds
        y: costs[index],   // y value is the corresponding cost
    }));

    const valueFormatter = (date) =>
        date.toLocaleDateString('en-EN', {
            month: '2-digit',
            day: '2-digit',
        });

    const config = {
        series: [
            { data: costData },
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
        data: [], // Update this with appropriate y-axis data if needed
        scaleType: 'linear',
    };

    return (
        <Box sx={{ width: 500, maxWidth: 500 }}>
            <LineChart
                xAxis={[
                    {
                        ...xAxisCommon,
                        id: 'bottomAxis',
                        scaleType: 'time',
                    },
                ]}
                yAxis={[
                    {
                        ...yAxisCommon,
                        id: 'rightAxis',
                        scaleType: 'linear'
                    }
                ]}
                {...config}
            />
        </Box>
    );
}