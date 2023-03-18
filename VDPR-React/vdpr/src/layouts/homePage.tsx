import {
  ChakraProvider,
  Box,
  Heading,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import FileUpload from "../components/FileUpload"

const StartPage = () => {
  return (
  <Box textAlign="center" fontSize="xl">
    <Grid minH="25vh" p={3}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <VStack spacing={3}>
        <Heading>
          Welcome to VDPR
          <FileUpload />
        </Heading>
      </VStack>
    </Grid>
  </Box>
  )
};

export default StartPage;