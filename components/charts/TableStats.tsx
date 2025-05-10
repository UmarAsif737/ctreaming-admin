"use client";

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { defaults } from "chart.js/auto";

// Set global chart defaults
defaults.maintainAspectRatio = false;
defaults.responsive = true;

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the types for the data structure
interface Status {
    status: string;
    count: number;
}

interface Table {
    _id: string;
    name: string;
    statuses: Status[];
}

interface TableStatsData {
    tables: Table[];
}

interface TableStatsChartProps {
    tableStatsData: TableStatsData;
}

const TableStatsChart: React.FC<TableStatsChartProps> = ({ tableStatsData }) => {
    const [chartData, setChartData] = useState<any>({
        labels: [], // Placeholder for table names (x-axis labels)
        datasets: [],
    });

    // Correctly typed chart options
    const chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Product Status Across Tables',
                align: 'center', // Valid align value
                font: {
                    size: 18,
                },
            },
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        if (tableStatsData) {
            const tables = tableStatsData.tables;

            // Extract unique statuses and table names
            const uniqueStatuses = Array.from(new Set(tables.flatMap(table => table.statuses.map(status => status.status))));
            const tableNames = tables.map(table => table.name);

            // Prepare datasets for each status
            const datasets = uniqueStatuses.map(status => ({
                label: status,
                data: tables.map(table => {
                    const statusObj = table.statuses.find(s => s.status === status);
                    return statusObj ? statusObj.count : 0;
                }),
                backgroundColor: getColorForStatus(status), // Use dynamic color assignment
            }));

            // Update chart data with the table names and datasets
            setChartData({
                labels: tableNames,
                datasets: datasets,
            });
        }
    }, [tableStatsData]);

    // Function to return a color based on the status
    const getColorForStatus = (status: string) => {
        switch (status) {
            case "to-shoot":
                return "#007bff"; // primary (blue)
            case "shot":
                return "#dc3545"; // danger (red)
            case "images-ready":
                return "#6c757d"; // secondary (gray)
            case "changes-required":
                return "#ffc107"; // warning (yellow)
            case "approved":
            default:
                return "#28a745"; // success (green)
        }
    };

    return (
        <div className="chart h-[400px] w-11/12 lg:w-10/12 2xl:w-5/12 bg-slate-50 p-5 rounded-2xl">
            <Bar data={chartData} options={chartOptions} height={400} />
        </div>
    );
};

export default TableStatsChart;
