import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);


const BarChart = ({data}) => {
    
    //console.log('Bar:', data)

    const quarterlyDataNonEmergency = []
    const quarterlyDataEmergency = []
    const dataPoint = {}
    for(let i=0; i<data.length; i++){
        const [year, month, date] = data[i].statusdate.split('-')
        if(month === '01' || month === '02' || month === '03'){
            if(!dataPoint[`${year} Q1`]){
                dataPoint[`${year} Q1`] = 1
            }
            else{
                dataPoint[`${year} Q1`] += 1;
            }
        }
        if(month === '04' || month === '05' || month === '06'){
            if(!dataPoint[`${year} Q2`]){
                dataPoint[`${year} Q2`] = 1
            }
            else{
                dataPoint[`${year} Q2`] += 1;
            }
        }
        if(month === '07' || month === '08' || month === '09'){
            if(!dataPoint[`${year} Q3`]){
                dataPoint[`${year} Q3`] = 1
            }
            else{
                dataPoint[`${year} Q3`] += 1;
            }
        }
        if(month === '10' || month === '11' || month === '12'){
            if(!dataPoint[`${year} Q4`]){
                dataPoint[`${year} Q4`] = 1
            }
            else{
                dataPoint[`${year} Q4`] += 1;
            }
        }
    }

    //console.log(dataPoint)
    const arrayOfObj = Object.entries(dataPoint).map((e) => ( { x: e[0], y: e[1] } ));
    console.log(arrayOfObj)
    console.log('Total')

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