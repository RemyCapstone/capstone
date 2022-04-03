import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);


const BarChart = ({data}) => {
    
    console.log('Bar:', data)

    const dataPoint = {}
    const dataPointEmergency = {}
    for(let i=0; i<data.length; i++){
        const [year, month, date] = data[i].statusdate.split('-')
        
        if(month === '01' || month === '02' || month === '03'){
            if(data[i].type === 'EMERGENCY'){
                if(!dataPointEmergency[`${year} Q1`]){
                dataPointEmergency[`${year} Q1`] = 1
                }
                else{
                    dataPointEmergency[`${year} Q1`] += 1;
                }
            }
            else{
                if(!dataPoint[`${year} Q1`]){
                    dataPoint[`${year} Q1`] = 1
                }
                else{
                    dataPoint[`${year} Q1`] += 1;
                }
            }
        }
        if(month === '04' || month === '05' || month === '06'){
            if(data[i].type === 'EMERGENCY'){
                if(!dataPointEmergency[`${year} Q2`]){
                dataPointEmergency[`${year} Q2`] = 1
                }
                else{
                    dataPointEmergency[`${year} Q2`] += 1;
                }
            }
            else{
                if(!dataPoint[`${year} Q2`]){
                    dataPoint[`${year} Q2`] = 1
                }
                else{
                    dataPoint[`${year} Q2`] += 1;
                }
            }
        }
        if(month === '07' || month === '08' || month === '09'){
            if(data[i].type === 'EMERGENCY'){
                if(!dataPointEmergency[`${year} Q3`]){
                dataPointEmergency[`${year} Q3`] = 1
                }
                else{
                    dataPointEmergency[`${year} Q3`] += 1;
                }
            }
            else{
                if(!dataPoint[`${year} Q3`]){
                    dataPoint[`${year} Q3`] = 1
                }
                else{
                    dataPoint[`${year} Q3`] += 1;
                }
            }
        }
        if(month === '10' || month === '11' || month === '12'){
            if(data[i].type === 'EMERGENCY'){
                if(!dataPointEmergency[`${year} Q4`]){
                dataPointEmergency[`${year} Q4`] = 1
                }
                else{
                    dataPointEmergency[`${year} Q4`] += 1;
                }
            }
            else{
                if(!dataPoint[`${year} Q4`]){
                    dataPoint[`${year} Q4`] = 1
                }
                else{
                    dataPoint[`${year} Q4`] += 1;
                }
            }
        }
    }

    //console.log(dataPoint)
    const quarterlyDataNonEmergency = Object.entries(dataPoint).map((e) => ( { x: e[0], y: e[1] } ));
    const quarterlyDataEmergency = Object.entries(dataPointEmergency).map((e) => ( { x: e[0], y: e[1] } ));
    let allLabels = quarterlyDataEmergency.concat(quarterlyDataNonEmergency);
    for(let i=0; i<allLabels.length; i++){
        allLabels[i] = allLabels[i].x
    }
    let uniqueLabels = [];
    allLabels.forEach((c) => {
        if (!uniqueLabels.includes(c)) {
            uniqueLabels.push(c);
        }
    });
    uniqueLabels.sort()
    //console.log(uniqueLabels)

        return(
                <Bar
                    data={{
                        labels: uniqueLabels,
                        datasets: [{
                            label: 'Non-Emergency',
                            data: quarterlyDataNonEmergency,
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
                            data: quarterlyDataEmergency,
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