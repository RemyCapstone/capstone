import { Box, Flex, Spacer, Text} from '@chakra-ui/layout';
import {Select } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {useState} from 'react';
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);


const BarChartVio = ({data}) => {
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

    const dataClassA = {}
    const dataClassB = {}
    const dataClassC = {}

    
        for(let i=0; i<data.length; i++){
            const [year, month, date] = data[i].inspectiondate.split('-')
            //console.log(data[i].class)
            if(interval == 'Quarterly'){
                //console.log('quarter')
                if(month == '01' || month == '02' || month == '03'){
                    if(data[i].class == 'B') !dataClassB[`${year} Q1`] ? dataClassB[`${year} Q1`] = 1 : dataClassB[`${year} Q1`] += 1;
                    else if (data[i].class == 'C') !dataClassC[`${year} Q1`] ? dataClassC[`${year} Q1`] = 1 : dataClassC[`${year} Q1`] += 1;
                    else !dataClassA[`${year} Q1`] ? dataClassA[`${year} Q1`] = 1 : dataClassA[`${year} Q1`] += 1;
                }
                if(month == '04' || month == '05' || month == '06'){
                    if(data[i].class == 'B') !dataClassB[`${year} Q2`] ? dataClassB[`${year} Q2`] = 1 : dataClassB[`${year} Q2`] += 1;
                    else if (data[i].class == 'C') !dataClassC[`${year} Q2`] ? dataClassC[`${year} Q2`] = 1 : dataClassC[`${year} Q2`] += 1;
                    else !dataClassA[`${year} Q2`] ? dataClassA[`${year} Q2`] = 1 : dataClassA[`${year} Q2`] += 1;
                }
                if(month == '07' || month == '08' || month == '09'){
                    if(data[i].class == 'B') !dataClassB[`${year} Q3`] ? dataClassB[`${year} Q3`] = 1 : dataClassB[`${year} Q3`] += 1;
                    else if (data[i].class == 'C') !dataClassC[`${year} Q3`] ? dataClassC[`${year} Q3`] = 1 : dataClassC[`${year} Q3`] += 1;
                    else !dataClassA[`${year} Q3`] ? dataClassA[`${year} Q3`] = 1 : dataClassA[`${year} Q3`] += 1;
                }
                if(month == '10' || month == '11' || month == '12'){
                    if(data[i].class == 'B') !dataClassB[`${year} Q4`] ? dataClassB[`${year} Q4`] = 1 : dataClassB[`${year} Q4`] += 1; 
                    else if (data[i].class =='C') !dataClassC[`${year} Q4`] ? dataClassC[`${year} Q4`] = 1 : dataClassC[`${year} Q4`] += 1;
                    else !dataClassA[`${year} Q4`] ? dataClassA[`${year} Q4`] = 1 : dataClassA[`${year} Q4`] += 1;   
                }
            }
            if(interval == 'Yearly'){
                 if(data[i].class == 'B') !dataClassB[`${year}`] ? dataClassB[`${year}`] = 1 : dataClassB[`${year}`] += 1;
                 if(data[i].class == 'C') !dataClassC[`${year}`] ? dataClassC[`${year}`] = 1 : dataClassC[`${year}`] += 1;
                 else !dataClassA[`${year}`] ? dataClassA[`${year}`] = 1 : dataClassA[`${year}`] += 1;
            }
            if(interval == 'Monthly'){
                //console.log('monthly')
                 const monthString = month == '01' ? 'Jan' : 
                    month == '02' ? 'Feb' : month == '03' ? 'Mar' : month == '04' ? 'April' : 
                    month == '05' ? 'May' : month == '06' ? 'June' : month == '07' ? 'July' : 
                    month == '08' ? 'Aug' :  month == '09' ? 'Sep' :  month == '10' ? 'Oct' : 
                    month == '11' ? 'Nov' :  'Dec';
                 if(data[i].class == 'B') !dataClassB[`${year} ${month} ${monthString}`] ? dataClassB[`${year} ${month} ${monthString}`] = 1 : dataClassB[`${year} ${month} ${monthString}`] += 1;
                 else if(data[i].class == 'C') !dataClassC[`${year} ${month} ${monthString}`] ? dataClassC[`${year} ${month} ${monthString}`] = 1 : dataClassC[`${year} ${month} ${monthString}`] += 1;
                 else !dataClassA[`${year} ${month} ${monthString}`] ? dataClassA[`${year} ${month} ${monthString}`] = 1 : dataClassA[`${year} ${month} ${monthString}`] += 1;
            }
        }
    

    //console.log('class a', dataClassA)
    //console.log('class b', dataClassB)
    //console.log('class c', dataClassC)
    let quarterlyDataClassA = Object.entries(dataClassA).map((e) => ( { x: e[0], y: e[1] } ));
    let quarterlyDataClassB = Object.entries(dataClassB).map((e) => ( { x: e[0], y: e[1] } ));
    let quarterlyDataClassC = Object.entries(dataClassC).map((e) => ( { x: e[0], y: e[1] } ));
    let allLabels = quarterlyDataClassB.concat(quarterlyDataClassA).concat(quarterlyDataClassC);
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

    if(interval == 'Monthly'){
        quarterlyDataClassA = quarterlyDataClassA.map(e => {
            let strings = e.x.split(' ')
            return {x: `${strings[0]} ${strings[2]}`, y: e.y}
        })
        quarterlyDataClassB = quarterlyDataClassB.map(e => {
            let strings = e.x.split(' ')
            return {x: `${strings[0]} ${strings[2]}`, y: e.y}
        })
        quarterlyDataClassC = quarterlyDataClassC.map(e => {
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
       quarterlyDataClassA = quarterlyDataClassA.filter(e => uniqueLabels.includes(e.x))
       quarterlyDataClassB = quarterlyDataClassB.filter(e => uniqueLabels.includes(e.x))
       quarterlyDataClassC = quarterlyDataClassC.filter(e => uniqueLabels.includes(e.x))
   }

        return(
            <>
                <Text fontSize='xl' fontWeight='medium'>{data.length} violations issued since {data[data.length-1]?.inspectiondate.substring(0,data[data.length-1].inspectiondate.indexOf('-'))}:</Text>
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
                            label: 'Class A',
                            data: quarterlyDataClassA,
                            backgroundColor: [
                                'rgba(135, 171, 230, 0.2)',
                            ],
                            borderColor: [
                                'rgba(58, 30, 117, 0.5)',
                            ],
                            stack: 1,
                            borderWidth: 2
                        },
                        {
                            label: 'Class B',
                            data: quarterlyDataClassB,
                            backgroundColor: [
                                'rgba(55, 83, 191, 0.3)',
                            ],
                            borderColor: [
                                'rgba(58, 30, 117, 0.5)',
                            ],
                            stack: 1,
                            borderWidth: 2
                        },
                        {
                            label: 'Class C',
                            data: quarterlyDataClassC,
                            backgroundColor: [
                                'rgba(83, 0, 130, 0.3)',
                            ],
                            borderColor: [
                                'rgba(58, 30, 117, 0.5)',
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
                             x: {
                                stacked: true,
                            },
                            y: {
                                beginAtZero: true,
                                stacked: true
                            },
                        }                        
                    }}
                />

                    {iterations > 1 && <Flex w='100%' justifyContent='center' alignItems='center' cursor='pointer'>
                        {pages.map((page, index) => <Box onClick={() => clickHandler(index)} fontSize='lg' margin={4} fontWeight='bold' key={page} height='20px' width='20px'  backgroundColor={index == currentPage ? 'purple.600' : 'purple.200'} textAlign='center' borderRadius='50%'>{}</Box>)}
                    </Flex>}
                </>
        )
}

export default BarChartVio;