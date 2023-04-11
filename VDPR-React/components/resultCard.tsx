import React from "react";
import { 
  Card, 
  CardBody, 
  Text,
  CardHeader,
  Button,
  Heading,
  CircularProgress,
  CircularProgressLabel
} from "@chakra-ui/react";

export const ResultCard = (ResultCard: { credits: string | number; totalCredits: string | number; classes: string | number; totalClasses: string | number}) => {
  const percentage = Math.floor((Number(ResultCard.credits) / Number(ResultCard.totalCredits)) * 100);
  return (
    <Card border='1px' borderRadius={7} width={230}>
    <CardBody>
      <Heading size='md'>Core Requirements</Heading>
      <CircularProgress mt={3} value={percentage} thickness='7px' color='green.400' size='120px'>
        <CircularProgressLabel>{percentage}%</CircularProgressLabel>
      </CircularProgress>
      <Text mt={6}>Credits: {ResultCard.credits}/{ResultCard.totalCredits}</Text>
      <Text>Classes: {ResultCard.classes}/{ResultCard.totalClasses}</Text>
      <Button>See More</Button>
    </CardBody>
  </Card>
  )
};

export default ResultCard;