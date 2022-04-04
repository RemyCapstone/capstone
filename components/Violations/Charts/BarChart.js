import { Box, Flex, Spacer, Text} from '@chakra-ui/layout';
import {Select } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {useState} from 'react';
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);


const BarChart = ({data}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [interval, setInterval] = useState('Monthly');
    

    const clickHandler = (page) => {
      setCurrentPage(page);
    }
    //console.log('Bar:', data)

    const handleSelect = (value) => {
        setInterval(value);
        setCurrentPage(0);
    }

    const dataPoint = {}
    const dataPointEmergency = {}

    
        for(let i=0; i<data.length; i++){
            const [year, month, date] = data[i].statusdate.split('-')
            if(interval === 'Quarterly'){
                if(month === '01' || month === '02' || month === '03'){
                    if(data[i].type === 'EMERGENCY') !dataPointEmergency[`${year} Q1`] ? dataPointEmergency[`${year} Q1`] = 1 : dataPointEmergency[`${year} Q1`] += 1;
                    else !dataPoint[`${year} Q1`] ? dataPoint[`${year} Q1`] = 1 : dataPoint[`${year} Q1`] += 1;
                }
                if(month === '04' || month === '05' || month === '06'){
                    if(data[i].type === 'EMERGENCY') !dataPointEmergency[`${year} Q2`] ? dataPointEmergency[`${year} Q2`] = 1 : dataPointEmergency[`${year} Q2`] += 1;
                    else !dataPoint[`${year} Q2`] ? dataPoint[`${year} Q2`] = 1 : dataPoint[`${year} Q2`] += 1;
                }
                if(month === '07' || month === '08' || month === '09'){
                    if(data[i].type === 'EMERGENCY') !dataPointEmergency[`${year} Q3`] ? dataPointEmergency[`${year} Q3`] = 1 : dataPointEmergency[`${year} Q3`] += 1;
                    else !dataPoint[`${year} Q3`] ? dataPoint[`${year} Q3`] = 1 : dataPoint[`${year} Q3`] += 1;
                }
                if(month === '10' || month === '11' || month === '12'){
                    if(data[i].type === 'EMERGENCY') !dataPointEmergency[`${year} Q4`] ? dataPointEmergency[`${year} Q4`] = 1 : dataPointEmergency[`${year} Q4`] += 1; 
                    else !dataPoint[`${year} Q4`] ? dataPoint[`${year} Q4`] = 1 : dataPoint[`${year} Q4`] += 1;   
                }
            }
            if(interval === 'Yearly'){
                 if(data[i].type === 'EMERGENCY') !dataPointEmergency[`${year}`] ? dataPointEmergency[`${year}`] = 1 : dataPointEmergency[`${year}`] += 1;
                 else !dataPoint[`${year}`] ? dataPoint[`${year}`] = 1 : dataPoint[`${year}`] += 1;
            }
            if(interval === 'Monthly'){
                 const monthString = month === '01' ? 'Jan' : 
                    month === '02' ? 'Feb' : month === '03' ? 'Mar' : month === '04' ? 'April' : 
                    month === '05' ? 'May' : month === '06' ? 'June' : month === '07' ? 'July' : 
                    month === '08' ? 'Aug' :  month === '09' ? 'Sep' :  month === '10' ? 'Oct' : 
                    month === '11' ? 'Nov' :  'Dec';
                 if(data[i].type === 'EMERGENCY') !dataPointEmergency[`${year} ${month} ${monthString}`] ? dataPointEmergency[`${year} ${month} ${monthString}`] = 1 : dataPointEmergency[`${year} ${month} ${monthString}`] += 1;
                 else !dataPoint[`${year} ${month} ${monthString}`] ? dataPoint[`${year} ${month} ${monthString}`] = 1 : dataPoint[`${year} ${month} ${monthString}`] += 1;
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

    if(interval === 'Monthly'){
        quarterlyDataNonEmergency = quarterlyDataNonEmergency.map(e => {
            let strings = e.x.split(' ')
            return {x: `${strings[0]} ${strings[2]}`, y: e.y}
        })
        quarterlyDataEmergency = quarterlyDataEmergency.map(e => {
            let strings = e.x.split(' ')
            return {x: `${strings[0]} ${strings[2]}`, y: e.y}
        })
        uniqueLabels = uniqueLabels.map(e => {
            let strings = e.split(' ');
            return `${strings[0]} ${strings[2]}`
        })
    }

    /*
        Pagination for bar chart if its too big
    */
    const barsOnScreen = 10;

    let limit = uniqueLabels.length <= barsOnScreen*(currentPage+1) ? uniqueLabels.length : barsOnScreen*(currentPage+1);
    const iterations = Math.ceil(uniqueLabels.length / barsOnScreen);
    const pages = []

    for(let i=1; i<=iterations; i++){
      pages.push(i)
    }

    


   if(uniqueLabels.length > barsOnScreen){
       uniqueLabels = uniqueLabels.slice(barsOnScreen*currentPage, limit)
       quarterlyDataNonEmergency = quarterlyDataNonEmergency.filter(e => uniqueLabels.includes(e.x))
       quarterlyDataEmergency = quarterlyDataEmergency.filter(e => uniqueLabels.includes(e.x))
   }

        return(
            <>
                <Flex justifyContent={'right'}>
                    <Select onChange={(e) => handleSelect(e.target.value)} w='fit-content' p='2'>
                        <option value={'Monthly'}>
                            {'Monthly'}
                        </option>
                        <option value={'Quarterly'}>
                            {'Quarterly'}
                        </option>
                        <option value={'Yearly'}>
                            {'Yearly'}
                        </option>
                    </Select>
                </Flex>
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
                        {pages.map((page, index) => <Box onClick={() => clickHandler(index)} fontSize='lg' margin={4} fontWeight='bold' key={page} color={index === currentPage ? 'red.700' : 'red.300'}  height='20px' width='20px'  backgroundColor={index === currentPage ? 'red.700' : 'red.300'} textAlign='center' borderRadius='50%'>{}</Box>)}
                    </Flex>}
                </>
        )
}

export default BarChart;