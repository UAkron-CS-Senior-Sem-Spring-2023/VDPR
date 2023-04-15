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
} from "@chakra-ui/react"
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { useState, useEffect } from "react";

interface CoursesProps {
  courses: string;
}

function Courses({ courses }: CoursesProps) {
  const catalogNum = courses.catalogNum;
  const courseType = courses.courseType;
  const grade = courses.grade;
  const subject = courses.subject;
  const term = courses.term;
  const title = courses.title;
  const units = courses.units;
  const year = courses.year;
  const textColor = useColorModeValue("gray.700", "gray.200");
  
  return (
    <Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Text color={textColor} >{catalogNum}</Text>
        <Text color={textColor} >{courseType}</Text>
        <Text color={textColor} >{grade}</Text>
        <Text color={textColor} >{subject}</Text>
        <Text color={textColor} >{term}</Text>
        <Text color={textColor} >{title}</Text>
        <Text color={textColor} >{units}</Text>
        <Text color={textColor} >{year}</Text>
      </Box>
    </Box>
  );
} 

export default Courses;