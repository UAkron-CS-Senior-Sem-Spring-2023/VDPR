import {
  Text,
  Box,
  Heading,
  VStack,
  Grid,
} from "@chakra-ui/react"
import { useRouter } from 'next/router'
import ResultCard from "../components/resultCard";

 export const Results = () => {
  const router = useRouter();
  const queryKey = 'results';
  const data = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))
  return (
  <Box textAlign="center" fontSize="xl" mb={20}>
      <VStack spacing={3}>
        <Heading>
          Transcript Results
        </Heading>
          <ResultCard credits={"9"} totalCredits={"15"} classes={"4"} totalClasses={"6"}></ResultCard>
        <Text>{data}</Text>
      </VStack>
  </Box>
  )
};

export default Results;
