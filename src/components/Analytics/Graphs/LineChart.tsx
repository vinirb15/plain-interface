import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = (data: any) => {
    const chartLine = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
            {
                label: "This Week",
                data: [12, 4, 65, 85, 32],
                borderWidth: 3,
                borderColor: 'rgba(77,166,253,0.85)',
                backgroundColor: 'transparent',
            },
            {
                label: "Last Week",
                data: [8, 0, 40, 50, 10],
                borderWidth: 3,
                borderColor: '#f09bb1',
                backgroundColor: 'transparent',
            }
        ],
    }
    return (
        <Line
            data={chartLine}
            options={{
                title: {
                    display: true,
                    text: data.title,
                    fontSize: 25
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                scales: {
                    // xAxes: [{
                    //     ticks: {
                    //         beginAtZero: true,
                    //         min: 0,
                    //         max: 100
                    //     }
                    // }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: 200
                        }
                    }]
                }
            }}
        />
    )
}

export default LineChart;