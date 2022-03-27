import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';

const ProfileDetailsPage = ({}) => {
    return (
        <Box>

        </Box>
    )
}


export async function getServerSideProps({ params: { userid } }) {

  return {
    props: {
        
    },
  };
}

export default ProfileDetailsPage;