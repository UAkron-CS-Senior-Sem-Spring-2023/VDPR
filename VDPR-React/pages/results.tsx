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
  return (
  <Box textAlign="center" fontSize="xl">
    <Grid minH="25vh" p={3}>

      <VStack spacing={3}>
        <Heading>
          Transcript Results
        </Heading>
        <Text>{router.query.results}</Text>
      </VStack>
    </Grid>
  </Box>
  )
};

export default Results;
