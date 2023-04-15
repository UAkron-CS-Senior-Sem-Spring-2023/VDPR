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
import { CheckIcon, CloseIcon, ChevronDownIcon, TimeIcon } from '@chakra-ui/icons'
import { useState, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "./DataTable";

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

  const [width, setWidth] = useState<number>(window?.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window?.innerWidth);
  }
  useEffect(() => {
      window?.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window?.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;

  let satisfiedColor = satisfied ? "green.300" : "red.400";
  let satisfiedIcon = satisfied ? <CheckIcon /> : <CloseIcon />;
  // if parent contains the text 'Important Notes' then remove the text in parentheses
  let showComplete = true;
  if (parent && parent.includes('Important Notes')) {
    showComplete = false;
  }
  // check the courses for the subtile see if any of them have a grade of 'IP'
  let hasIP = false;
  if (courses && courses.length > 0) {
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].grade === 'IP') {
        hasIP = true;
        break;
      }
    }
  }
  // if show complete is true and has IP is true then satisfied color is yellow
  if (showComplete && hasIP && satisfied) {
    satisfiedColor = "yellow.300";
    satisfiedIcon = <TimeIcon />;
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

  interface Course {
    catalogNum: string;
    courseType: string;
    grade: string;
    subject: string;
    term: string;
    title: string;
    units: number;
    year: number;
  }

  const courseHelper = createColumnHelper<Course>();

  const courseData = courses.map((course: any) => {
    return {
      catalogNum: course.catalogNum,
      grade: course.grade,
      subject: course.subject,
      term: course.term,
      title: course.title,
      units: course.units,
      year: course.year,
    }
  });

  const courseColumns = [
    courseHelper.accessor("catalogNum", {
      cell: (info) => info.getValue(),
      header: "Catalog Number"
    }),
    courseHelper.accessor("grade", {
      cell: (info) => info.getValue(),
      header: "Grade"
    }),
    courseHelper.accessor("subject", {
      cell: (info) => info.getValue(),
      header: "Subject"
    }),
    courseHelper.accessor("term", {
      cell: (info) => info.getValue(),
      header: "Term"
    }),
    courseHelper.accessor("title", {
      cell: (info) => info.getValue(),
      header: "Title"
    }),
    courseHelper.accessor("units", {
      cell: (info) => info.getValue(),
      header: "Units",
      meta: {
        isNumeric: true
      }
    }),
    courseHelper.accessor("year", {
      cell: (info) => info.getValue(),
      header: "Year",
      meta: {
        isNumeric: true
      }
    }),
  ];

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
          <Box w={"11.5%"} backgroundColor={"gray.200"} borderRightRadius={10} ml="auto" textAlign={"center"} display={"flex"} flexDir={"column"}>
            <Box flex={1} display="flex" flexDirection="column" justifyContent="center" minH="30px">
              {creditsNeeded != -1 && (
              <Heading color={"gray.700"} size={"sm"}> Credits: {creditsTaken}/{creditsNeeded} </Heading>
              )}
              {coursesNeeded != -1 && (
              <Heading color={"gray.700"} size={"sm"}> Courses: {coursesTaken}/{coursesNeeded} </Heading>
              )}
            </Box>
              {( courses && courses.length > 0 ) && (
              <Button onClick={onToggle} size="lg" bg={bgButtonColor} color="gray.900" _hover={{bg: "gray.300"}} borderBottomRightRadius={"10px"} flex={1} minH="30px" w="100%">
                <Icon as={ChevronDownIcon} />
              </Button>
              )}
          </Box>
          )}
        </HStack>
        <Collapse in={isOpen} unmountOnExit={true}>
          <DataTable columns={courseColumns} data={courseData} />
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
            <Box flex={1} display="flex" flexDirection="column" justifyContent="center" minH="30px">
              {creditsNeeded != -1 && (
              <Heading color={"gray.700"} size={"sm"}> Credits: {creditsTaken}/{creditsNeeded} </Heading>
              )}
              {coursesNeeded != -1 && (
              <Heading color={"gray.700"} size={"sm"}> Courses: {coursesTaken}/{coursesNeeded} </Heading>
              )}
            </Box>
              {( courses && courses.length > 0 ) && (
              <Button onClick={onToggle} size="lg" bg={bgButtonColor} color="gray.900" _hover={{bg: "gray.300"}} borderBottomRightRadius={"10px"} flex={1} minH="30px" w="100%">
                <Icon as={ChevronDownIcon} />
              </Button>
              )}
          </Box>
          )}
        </VStack>
        <Collapse in={isOpen} unmountOnExit={true}>
          <DataTable columns={courseColumns} data={courseData}  />
        </Collapse>
      </Card>
      </Box>
    );
  }
} 

export default SubtileCard;