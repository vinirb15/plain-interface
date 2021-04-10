import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = (props: any) => {
    const chartData = {
        labels: props.labels,
        datasets: [
            {
                label: 'Last Month',
                // borderColor: 'rgb(255, 99, 132)',
                data: props.data,
                backgroundColor: props.colors
            }
        ],
    }

    return (
        <>
            {/* <button onClick={() => console.log(data)}>teste</button> */}
            <Pie
                data={chartData}
                type='pie'
                options={{
                    title: {
                        display: true,
                        text: props.title,
                        fontSize: 25
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }}
            />
        </>
    )
}

export default PieChart;