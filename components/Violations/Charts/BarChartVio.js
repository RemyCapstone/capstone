import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {useState} from 'react';
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);


const BarChartVio = ({data}) => {
    const [currentPage, setCurrentPage] = useState(0);

    const clickHandler = (page) => {
      setCurrentPage(page);
    }
    //console.log('Bar:', data)

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
    let quarterlyDataNonEmergency = Object.entries(dataPoint).map((e) => ( { x: e[0], y: e[1] } ));
    let quarterlyDataEmergency = Object.entries(dataPointEmergency).map((e) => ( { x: e[0], y: e[1] } ));
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
    uniqueLabels.sort().reverse()

    /*
        Pagination for bar chart if its too big
    */
    let limit = uniqueLabels.length <= 10*(currentPage+1) ? uniqueLabels.length : 10*(currentPage+1);
    const iterations = Math.ceil(uniqueLabels.length / 10);
    const pages = []

    for(let i=1; i<=iterations; i++){
      pages.push(i)
    }

    


   if(uniqueLabels.length > 10){
       uniqueLabels = uniqueLabels.slice(10*currentPage, limit)
       quarterlyDataNonEmergency = quarterlyDataNonEmergency.filter(e => uniqueLabels.includes(e.x))
       quarterlyDataEmergency = quarterlyDataEmergency.filter(e => uniqueLabels.includes(e.x))
   }

        return(
            <>
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

                    {iterations > 1 && <Flex w='100%' justifyContent='center' alignItems='center' cursor='pointer'>
                        {pages.map((page, index) => <Text onClick={() => clickHandler(index)} fontSize='lg' p='4' fontWeight='bold' key={page} color={index === currentPage ? 'red.700' : 'red.300'} textAlign='center'>{⚪}</Text>)}
                    </Flex>}
                </>
        )
}

export default BarChartVio;