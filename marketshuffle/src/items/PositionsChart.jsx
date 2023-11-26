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

const LineChartComponent = ({positions}) => {
    const formattedData = transformData(positions);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis type="number" domain={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cost" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;