import {
  Text,
  Box,
  Heading,
  VStack,
  Button,
  Icon,
  Card,
  HStack,
} from "@chakra-ui/react"
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { useState, useEffect } from "react";

interface SubtileProps {
  title: string;
  description: string;
}

function SubtileCard({ parent, satisfied, name, description }: SubtileProps) {
  const [width, setWidth] = useState<number>(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;

  const satisfiedColor = satisfied ? "green.300" : "red.400";
  const satisfiedIcon = satisfied ? <CheckIcon /> : <CloseIcon />;
  // if parent contains the text 'Important Notes' then remove the text in parentheses
  let showComplete = true;
  if (parent && parent.includes('Important Notes')) {
    showComplete = false;
  }
  if (name && name.includes('(')) {
    name = name.substring(0, name.indexOf('('));
  }

  if (!isMobile) {
    return (
      <Card width={"full"}  m={2} borderRadius={10} borderWidth={1} borderColor={"gray.200"} backgroundColor={"white"}>
        <HStack spacing={0} alignItems={"stretch-vertically"}>
          {showComplete && (
          <Box backgroundColor={satisfiedColor} borderLeftRadius={10} p={1} textAlign={"center"} justifyContent={"center"} display={"flex"} flexDir={"column"}>
            <Heading size="md" color={"gray.700"}> {satisfiedIcon} </Heading>
          </Box>
          )}
          <Box w={"20%"} backgroundColor={"gray.200"} p={2} borderLeftRadius={10}>
            <Heading size="md" color={"gray.700"}> {name} </Heading>
          </Box>
          <Box>
            <Text color={"gray.700"}> {description} </Text>
          </Box>
        </HStack>
      </Card>
    );
  } else {
    return (
      <Card width={"full"}  m={2} borderRadius={10} borderWidth={1} borderColor={"gray.200"} backgroundColor={"white"}>
        <VStack spacing={0} alignItems={"stretch-horizontally"}>
          {showComplete && (
          <Box backgroundColor={satisfiedColor} borderTopRadius={10} p={1} textAlign={"center"} justifyContent={"center"} display={"flex"} flexDir={"row"}>
            <Heading size="md" color={"gray.700"}> {satisfiedIcon} </Heading>
          </Box>
          )}
          <Box h={"20%"} backgroundColor={"gray.200"} p={2} borderTopRadius={10}>
            <Heading size="md" color={"gray.700"}> {name} </Heading>
          </Box>
          <Box>
            <Text color={"gray.700"}> {description} </Text>
          </Box>
        </VStack>
      </Card>
    );
  }
} 

export default SubtileCard;