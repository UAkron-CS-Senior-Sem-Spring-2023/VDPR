import {
  Text,
  Box,
  Button,
  Heading,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { useNavigate, useLocation } from "react-router-dom";

function PrettyPrint(props: { jsonObj: any; }){
  return <pre>{JSON.stringify(props.jsonObj,null,2)}</pre>
}


const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const handleClick = () => navigate('/');
  return (
  <Box textAlign="center" fontSize="xl">
    <Grid minH="25vh" p={3}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Button justifySelf={"flex-start"} onClick={handleClick}>Start Over</Button>
      <VStack spacing={3}>
        <Heading>
          Transcript Results
        </Heading>
        <Text>{location.state.result}</Text>
      </VStack>
    </Grid>
  </Box>
  )
};

export default ResultsPage;