import React from "react";
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import dynamic from "next/dynamic";

export default function Map() {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });

  return (
    <Box minWidth='100%' margin='auto' p='4'>
      <div id="map">
        <MapWithNoSSR />
      </div>
    </Box>
  );
}