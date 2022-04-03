import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);


const BarChart = ({data}) => {
    
    console.log('Bar:', data)

    const buildTimeLineData = []
    for(let i=0; i<data.length; i++){

    }

        return(
                <Bar
                    data={{
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets: [{
                            label: 'Non-Emergency',
                            data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(255, 206, 86, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                            ],
                            stack: 1,
                            borderWidth: 2
                        },
                        {
                            label: 'Emergency',
                            data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                            ],
                            stack: 1,
                            borderWidth: 2
                        },
                        
                        ],
                    }}

                    options = {{
                        responsive: true,
                        legend: {
                            display: true,
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            },
                        }                        
                    }}
                />
        )
}

export default BarChart;