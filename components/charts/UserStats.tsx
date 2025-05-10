"use client";
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserStatsChart = ({ userStatsData }: any) => {
    const [chartData, setChartData] = useState({
        labels: ['Today', 'Last 7 Days', 'Total'], // X-axis labels
        datasets: [
            {
                label: 'Admins',
                data: [0, 0, 0], // Placeholder data for admins
                borderColor: '#42a5f5', // Admins line color (blue)
                backgroundColor: 'rgba(66, 165, 245, 0.2)', // Admins fill color (light blue)
                borderWidth: 2,
                tension: 0.4, // Smooth curve
                pointRadius: 5, // Point size
                fill: true, // Fill area below the line
            },
            {
                label: 'Regular Users',
                data: [0, 0, 0], // Placeholder data for regular users
                borderColor: '#66bb6a', // Regular Users line color (green)
                backgroundColor: 'rgba(102, 187, 106, 0.2)', // Regular Users fill color (light green)
                borderWidth: 2,
                tension: 0.4, // Smooth curve
                pointRadius: 5, // Point size
                fill: true, // Fill area below the line
            },
        ],
    });

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const, // Use 'top' as a valid position
            },
            title: {
                display: true,
                text: 'User Registration Stats (Admins vs Regular Users)',
                font: {
                    size: 18,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Start the y-axis at 0
            },
        },
    };

    useEffect(() => {
        if (userStatsData) {
            const { today, lastWeek, total } = userStatsData;

            // Update the chart data with the data passed via props
            setChartData({
                labels: ['Today', 'Last 7 Days', 'Total'],
                datasets: [
                    {
                        label: 'Admins',
                        data: [today.admins, lastWeek.admins, total.admins],
                        borderColor: '#42a5f5',
                        backgroundColor: 'rgba(66, 165, 245, 0.2)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 5,
                        fill: true,
                    },
                    {
                        label: 'Regular Users',
                        data: [today.regularUsers, lastWeek.regularUsers, total.regularUsers],
                        borderColor: '#66bb6a',
                        backgroundColor: 'rgba(102, 187, 106, 0.2)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 5,
                        fill: true,
                    },
                ],
            });
        }
    }, [userStatsData]);

    return (
        <div className="chart h-[400px] w-11/12 lg:w-10/12 2xl:w-5/12 bg-slate-50 p-5 rounded-2xl">
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default UserStatsChart;
