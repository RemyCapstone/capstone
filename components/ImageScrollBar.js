import { useContext, useState } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ScrollMenu, slidingWindow, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const LeftArrow = () => {
  const { scrollPrev, getPrevItem, scrollToItem, getItemByIndex } = useContext(VisibilityContext);

const clickHandler = () => {
    scrollPrev();
  };

  return (
    <Flex justifyContent='center' alignItems='center' marginRight='1'>
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={clickHandler}
        fontSize='3xl'
        cursor='pointer'
        d={['none','none','none','block']}
      />
    </Flex>
  );
}

const RightArrow = () => {
  const { scrollNext, getNextItem, scrollToItem, getItemById, getItemElementById} = useContext(VisibilityContext);

  const clickHandler = () => {
    scrollNext();
  };

  
  return (
    <Flex justifyContent='center' alignItems='center' marginLeft='1'>
      <Icon
        as={FaArrowAltCircleRight}
        onClick={clickHandler} 
        fontSize='3xl'
        cursor='pointer'
        d={['none','none','none','block']}
    />
    </Flex>
  );
}

const ImageScrollbar = ({ data }) => {
    const [image, setImage] = useState(data[0])
    const [selectedPic, setSelectedPic] = useState(0)

    const clickHandler = (url, index) => {
        setImage(url)
        setSelectedPic(index)
    } 



  return (
      <>
      <Box backgroundColor="rgb(251, 251, 251);">
         <Flex justifyContent='center' alignItems='center' p='5'>
            <Image src={image} height={400} width={680} />
        </Flex>
      </Box>
    <ScrollMenu>
      {data.map((item, i) => (
        <Box onClick={() => clickHandler(item, i)} backgroundColor={i === selectedPic ? "blue.200" : "white"} border='1px' borderColor='gray.200' cursor='pointer' height="100px" width="170px" key={item} overflow='hidden' p='1'>
          <Image placeholder="blur" blurDataURL={item} src={item} height={96} width={170} />
        </Box>
      ))}
    </ScrollMenu>
    </>
  );
}

export default ImageScrollbar;