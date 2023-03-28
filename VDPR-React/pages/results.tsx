import {
  Text,
  Box,
  Heading,
  VStack,
  Grid,
} from "@chakra-ui/react"
import { useRouter } from 'next/router'

 export const Results = () => {
  const router = useRouter();
  const queryKey = 'results';
  const queryValue = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))
  return (
  <Box textAlign="center" fontSize="xl" mb={20}>
      <VStack spacing={3}>
        <Heading>
          Transcript Results
        </Heading>
        <Text>{queryValue}</Text>
      </VStack>
  </Box>
  )
};

export default Results;
