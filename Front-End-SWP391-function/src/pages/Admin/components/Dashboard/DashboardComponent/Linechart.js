import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart({ data, title }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
                font: {
                    // Thêm tùy chỉnh kích thước font ở đây
                    size: 24, // Kích thước chữ tiêu đề (có thể điều chỉnh)
                    weight: 'bold', // Độ đậm của chữ tiêu đề
                },
            },
        },
    };

    return <Line data={data} options={options} />;
}

export default LineChart;
