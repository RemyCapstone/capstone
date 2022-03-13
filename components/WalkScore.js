import Image from "next/image";
import { Box, Flex, Text, Link} from "@chakra-ui/react";
import {options, fetchWalkApi} from "../utils/walkScoreApi"
import {useState, useEffect} from 'react';


const WalkScore = ({long, lat, streetAddress}) => {
    const [scoreData, setScoreData] = useState({});

    const logo = 'https://cdn.walk.sc/images/api-logo.png';
    const moreInfoLogo = 'https://cdn.walk.sc/images/api-more-info.gif';
    const moreInfoLink = 'https://www.redfin.com/how-walk-score-works';

    useEffect(() => {
        const walkOptions = options(long,lat,streetAddress);
        fetchWalkApi(walkOptions).then((response) => {
            //console.log(response)
            const walkScore = response.substring(
                response.indexOf("<walkscore>") + 11, 
                response.lastIndexOf("</walkscore>")
            );
            const description = response.substring(
                response.indexOf("<description>") + 13, 
                response.lastIndexOf("</description>")
            );
            const walkScoreLink = response.substring(
                response.indexOf("<ws_link>") + 9, 
                response.lastIndexOf("</ws_link>")
            );
            setScoreData({walkScore,description, walkScoreLink})
        })
    }, []);

   
    //console.log(scoreData)

    return (
        <>
        <Flex paddingTop='2'>
            <Box cursor='pointer' paddingTop={0.5}>
                <Link href={scoreData.walkScoreLink} isExternal><Image src={logo} alt="home" width={140} height={20}/></Link>
            </Box>
            <Box paddingLeft={5}>
                <Link href={scoreData.walkScoreLink} isExternal><Text fontWeight='medium' fontSize='lg' color='blue.600'>{scoreData.walkScore}/100</Text></Link>
            </Box>
            <Box paddingLeft={2}>
                <Text fontWeight='medium' fontSize='lg' color='blue.600'>{scoreData.description}</Text>
            </Box>
            <Box cursor='pointer' paddingLeft={3} paddingTop={1}>
                <Link href={moreInfoLink} isExternal><Image src={moreInfoLogo} alt="home" width={15} height={15}/></Link>
            </Box>
        </Flex>
        
        </>
    )
}


export default WalkScore;