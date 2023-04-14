import React, { useState } from "react";
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
import SubtileCard from "./SubtileCard";

interface ResultCardProps {
  title: string;
  description: string;
  subtiles?: Subtile[];
}

export const ResultCard = ({ title, description, subtiles }: ResultCardProps) => {
  const [showSubtitles, setShowSubtitles] = useState(false);

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
  };

  return (
    <div onClick={toggleSubtitles}>
    <Card border='1px' borderRadius={7} width={240} mr={10} ml={10}>
    <CardBody>
      <Heading fontSize='20px'>{title}</Heading>
      <Text fontSize='13px'>{description}</Text>
      <CircularProgress mt={3} value={60} thickness='7px' color='green.400' size='120px'>
        <CircularProgressLabel>{60}%</CircularProgressLabel>
      </CircularProgress>
      {showSubtitles && subtiles && (
        <div>
          {subtiles.map((subtile) => (
            <SubtileCard
              title={subtile.title}
              description={subtile.description}
            />
          ))}
        </div>
      )}
      <Button>See More</Button>
    </CardBody>
  </Card>
  </div>
  )
};

export default ResultCard;