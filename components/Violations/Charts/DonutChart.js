import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


const DonutChart = ({data}) => {
    

    const donutLabels = []
    const donutData = []
    for(let i=0; i<data.length; i++){
        donutLabels.push(data[i][0])
        donutData.push(data[i][1])
    }
    //console.log('DONUT:', donutLabels)

        return(
                <Doughnut
                    data={{
                        labels: donutLabels,
                    datasets: [{
                        label: 'Complaints',
                        data: donutData,
                        backgroundColor: [
                        'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', '#6B8E23', '#7FFF00', '#FFA500', '#00FA9A', '#2E8B57', '#2F4F4F', '#00CED1', '#191970', '#8A2BE2', '	#4B0082', '#FF00FF', '	#FF1493', '#FFE4C4', '#C0C0C0'
                        ],
                        hoverOffset: 6,
                    }]
                    }}
                    options={{
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                // This more specific font property overrides the global property
                                font: {
                                    size: 11
                                }
                            }
                            }
                        }
                    }}
                />
        )
}

export default DonutChart;