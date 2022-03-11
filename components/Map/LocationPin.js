import { FaMapPin } from 'react-icons/fa';
import { Box, Flex, Text} from "@chakra-ui/react";

const LocationPin = ({ text }) => (
        <div className="pin">
            <FaMapPin  className="pin-icon" size={20} color="red"/>
            
        </div>

)

export default LocationPin;