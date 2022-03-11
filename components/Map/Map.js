import GoogleMapReact from 'google-map-react'
import './Map.module.css'
import LocationPin from './LocationPin'
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';

const Map = ({location}) => {
    return (
        <div className="map" style={{ height: '300px', width: '100%' }}>

            <div className="google-map" style={{ height: '300px', width: '50%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBVISwJcY6zXYJLQvRRXG_DMdi1dCQk0fk' }}
                defaultCenter={location}
                defaultZoom={15}
            >
            <LocationPin
                lat={location.lat}
                lng={location.lng}
                text={location.address}
            />
            </GoogleMapReact>
            </div>
        </div>
    )
}

export default Map;