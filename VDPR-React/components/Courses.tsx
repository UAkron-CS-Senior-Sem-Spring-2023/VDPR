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

interface CoursesProps {
  courses: string;
}

function Courses({courses}: CoursesProps) {
  // "catalogNum": "221",
  // "courseType": "",
  // "grade": "CR",
  // "subject": "3450",
  // "term": "Summe",
  // "title": "Analytic Geometry-Calculus I",
  // "units": 3,
  // "year": "2019"
  const catalogNum = courses.catalogNum;
  const courseType = courses.courseType;
  const grade = courses.grade;
  const subject = courses.subject;
  const term = courses.term;
  const title = courses.title;
  const units = courses.units;
  const year = courses.year;

  return (
    <Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Text color={"gray.700"} >{catalogNum}</Text>
        <Text color={"gray.700"} >{courseType}</Text>
        <Text color={"gray.700"} >{grade}</Text>
        <Text color={"gray.700"} >{subject}</Text>
        <Text color={"gray.700"} >{term}</Text>
        <Text color={"gray.700"} >{title}</Text>
        <Text color={"gray.700"} >{units}</Text>
        <Text color={"gray.700"} >{year}</Text>
      </Box>
    </Box>
  );
} 

export default Courses;