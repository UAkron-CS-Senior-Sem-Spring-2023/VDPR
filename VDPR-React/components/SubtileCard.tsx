import {
  Text,
  Box,
  Heading,
  VStack,
  Button,
  Icon,
  Card,
  HStack,
  useColorModeValue,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react"
import { CheckIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useState, useEffect } from "react";
import Courses from "./Courses";

interface SubtileProps {
  parent: string;
  tile: string;
  selected: boolean;
}

function SubtileCard({ parent, tile, selected }: SubtileProps) {
  let name = tile.name;
  let description = tile.otherRequirements;
  let satisfied = tile.satisfied;
  const coursesNeeded = tile.coursesNeeded;
  const coursesTaken = tile.coursesTaken;
  const creditsNeeded = tile.creditsNeeded;
  const creditsTaken = tile.creditsTaken;
  const courses = tile.courses;
  let showEndSection = true;
  if (creditsNeeded === -1 && coursesNeeded === -1 && !(courses && courses.length > 0) ) {
    showEndSection = false;
  }

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
  // some of the descriptions contain "Page x of y" at the end which is not needed.
  if (description && description.includes('Page')) {
    description = description.substring(0, description.indexOf('Page'));
  }

  const bgColor = useColorModeValue("gray.000", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const bgHeaderColor = useColorModeValue("gray.200", "gray.200");
  const bgButtonColor = useColorModeValue("gray.200", "gray.200");

  const [showData, setShowData] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  
  if (!isMobile) {
    return (
      <Box display={selected ? 'block' : 'none'}>
      <Card width={"full"} m={2} borderRadius={10} borderWidth={1} borderColor={"gray.200"} backgroundColor={bgColor}>
        <HStack spacing={0} alignItems={"stretch-vertically"}>
          {showComplete && (
            <Box backgroundColor={satisfiedColor} borderLeftRadius={10} p={1} textAlign={"center"} justifyContent={"center"} display={"flex"} flexDir={"column"}>
              <Heading size="md" color={"gray.700"}> {satisfiedIcon} </Heading>
            </Box>
          )}
          <Box w={"20%"} backgroundColor={bgHeaderColor} p={2} textAlign={"center"} justifyContent={"center"} display={"flex"} flexDir={"column"}>
            <Heading size="md" color={"gray.800"}> {name} </Heading>
          </Box>
          <Box flex={1}>
            <Text color={textColor} maxH="200px" overflow="auto"> {description} </Text>
          </Box>
          {showEndSection && (
          <Box w={"11%"} backgroundColor={"gray.200"} borderRightRadius={10} ml="auto" textAlign={"center"} display={"flex"} flexDir={"column"}>
            <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
              {creditsNeeded != -1 && (
              <Heading color={"gray.700"} size={"sm"}> Credits: {creditsTaken}/{creditsNeeded} </Heading>
              )}
              {coursesNeeded != -1 && (
              <Heading color={"gray.700"} size={"sm"}> Courses: {coursesTaken}/{coursesNeeded} </Heading>
              )}
            </Box>
              {( courses && courses.length > 0 ) && (
              <Button onClick={onToggle} size="lg" bg={bgButtonColor} color="gray.900" _hover={{bg: "gray.300"}} borderBottomRightRadius={"10px"} flex={1} maxH="30px" w="100%">
                <Icon as={ChevronDownIcon} />
              </Button>
              )}
          </Box>
          )}
        </HStack>
        <Collapse in={isOpen} unmountOnExit={true}>
        <Box>
          {courses.map((course) => (
            <Courses courses={course} />
          ))}
        </Box>
        </Collapse>
      </Card>
      </Box>
    );
  } else {
    return (
      <Box display={selected ? 'block' : 'none'}>
      <Card width={"full"}  m={2} borderRadius={10} borderWidth={1} borderColor={"gray.200"} backgroundColor={"white"}>
        <VStack spacing={0} alignItems={"stretch-horizontally"}>
          {showComplete && (
          <Box backgroundColor={satisfiedColor} borderTopRadius={10} p={1} textAlign={"center"} justifyContent={"center"} display={"flex"} flexDir={"row"}>
            <Heading size="md" color={"gray.700"}> {satisfiedIcon} </Heading>
          </Box>
          )}
          <Box h={"20%"} backgroundColor={"gray.200"} p={2}>
            <Heading size="md" color={"gray.700"}> {name} </Heading>
          </Box>
          <Box>
            <Text color={"gray.700"}> {description} </Text>
          </Box>
          {showEndSection && (
          <Box h={"11%"} backgroundColor={"gray.200"} borderRightRadius={10} ml="auto" textAlign={"center"} justifyContent={"center"} display={"flex"} flexDir={"row"}>
            {creditsNeeded != -1 && (<Heading color={"gray.700"} size={"sm"}> Credits: {creditsTaken}/{creditsNeeded} </Heading>)}
            {coursesNeeded != -1 && (<Heading color={"gray.700"} size={"sm"}> Courses: {coursesTaken}/{coursesNeeded} </Heading>)}
          </Box>
          )}
        </VStack>
        <Box>
          {courses.map((course) => (
            <Courses courses={course} />
          ))}
        </Box>
      </Card>
      </Box>
    );
  }
} 

export default SubtileCard;