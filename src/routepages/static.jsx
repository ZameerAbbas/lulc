import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const colors = {
    Builtup: '#d73027',
    Agriculture: '#98ff00',
    Vegetation: '#479f2e',
    Glacier: '#148bff',
    Barren: '#d0d6ff'
};



const Static = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/LULC_Stats.geojson')
            .then((res) => res.json())
            .then((geojson) => {
                // Transform GeoJSON to chart-friendly format
                const chartData = [];

                geojson.features.forEach((feature) => {
                    const year = feature.properties.Year;
                    const className = feature.properties.Class_Name;
                    const area = feature.properties.Area_km2;

                    let yearData = chartData.find((d) => d.year === year);
                    if (!yearData) {
                        yearData = { year };
                        chartData.push(yearData);
                    }

                    yearData[className] = area;
                });

                // Sort by year
                chartData.sort((a, b) => a.year - b.year);

                setData(chartData);
            })
            .catch((err) => console.error(err));
    }, []);
    return (
        <div className="p-6 w-full h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">LULC Area Change (km²)</h1>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {Object.keys(colors).map((key) => (
                        <Bar key={key} dataKey={key} stackId="a" fill={colors[key]} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Static