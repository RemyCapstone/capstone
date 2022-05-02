import { MapContainer, TileLayer} from 'react-leaflet'
import { useState} from "react";
import {Select, Flex, Spacer, Box, Text, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb} from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import buildingDetails from '../utils/building_details.json';
import MapMarkers from './MapMarkers';

//https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2hhbmRha2VyaDY3IiwiYSI6ImNsMmd0aWd4NDA3NjUza212YTAyZ3UzaXMifQ.FaxDrtLhoOY_I4M_7L4EHA

const Map = () => {
  const [filtered, setFiltered] = useState(buildingDetails)
  const [borough, setBorough] = useState('')
  const [minMax, setMinMax] = useState([0,60])

  const filterData = (values, borough) => {
    setFiltered(buildingDetails.filter(building => building.BOROUGH.includes(borough) && building.VIO_UNITS_RATIO >= values[0] && building.VIO_UNITS_RATIO <= values[1]))
  }

  const handleSelect = (value) => {
    setBorough(value);
    filterData(minMax, value);
}

  return (
    <>
      <Flex justifyContent='center'>
      <Select onChange={(e) => handleSelect(e.target.value)} w='fit-content' p='2'>
          <option value={''}>
              {'All Boroughs'}
          </option>
          <option value={'Brooklyn'}>
              {'Brooklyn'}
          </option>
          <option value={'Bronx'}>
              {'Bronx'}
          </option>
          <option value={'Manhattan'}>
              {'Manhattan'}
          </option>
          <option value={'Queens'}>
              {'Queens'}
          </option>
          <option value={'Staten Island'}>
              {'Staten Island'}
          </option>
        </Select>
        <Spacer />
        <Text fontSize='2xl' fontWeight='bold' marginTop='15px'>Average Violations Per Unit Range: {minMax[0]} to {minMax[1]}</Text>
      </Flex>

      <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 60]} min={0} max={60} step={1} onChangeEnd={(val) => filterData(val, borough)} onChange={(val) => setMinMax(val)}>
        <RangeSliderTrack bg='blue.100'>
          <RangeSliderFilledTrack bg='blue.600'/>
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0} />
        <RangeSliderThumb boxSize={6} index={1} />
      </RangeSlider>
      <MapContainer preferCanvas center={[40.7128,-73.950]} zoom={11} scrollWheelZoom={true} style={{minHeight: "1000px", width: "100%"}}>
        
        <TileLayer
              url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2hhbmRha2VyaDY3IiwiYSI6ImNsMmd0aWd4NDA3NjUza212YTAyZ3UzaXMifQ.FaxDrtLhoOY_I4M_7L4EHA"
              attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
          /> 

          <MapMarkers data={filtered}/>

      </MapContainer>
    </>
  )
}

export default Map