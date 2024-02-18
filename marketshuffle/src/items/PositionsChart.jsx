import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const transformData = (data) => {
    const sortedData = data?.sort((a, b) => a.date - b.date);

    const formattedData = sortedData?.map(item => {
        const date = new Date(item.date * 1000);

        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear().toString().slice(-2);
        return {
            ...item,
            date: `${month} ${year}`,
        };
    });

    return formattedData;
};

const LineChartComponent = ({ positions }) => {
    const formattedData = transformData(positions);
    console.log(formattedData)
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedData} margin={{ left: 30, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis type="number" domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="one" stroke="#8884d8" />
                <Line type="monotone" dataKey="ten" stroke="#344f34" />
                <Line type="monotone" dataKey="hundred" stroke="#9c285a" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;