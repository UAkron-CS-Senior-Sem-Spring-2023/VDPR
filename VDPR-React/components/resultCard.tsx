import React, { useState, useEffect } from "react";
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

interface Subtile {
  title: string;
  description: string;
  satisfied: boolean;
}

interface ResultCardProps {
  title: string;
  description: string;
  subtiles?: any[];
  handleClick?: () => void;
}

export const ResultCard = ({ title, description, subtiles, handleClick }: ResultCardProps) => {
  const selectedCardRef = React.useRef<HTMLDivElement | null>(null);

  const toggleCard = () => {
    const cards = Array.from(document.getElementsByClassName('result-card'));

    // if card clicked is already selected, remove the 'selected' class and border
    if (selectedCardRef.current?.classList.contains('selected')) {
      selectedCardRef.current?.classList.remove('selected');
      (selectedCardRef.current?.firstChild as HTMLElement).style.border = '1px solid #e2e8f0';
      return;
    }

    // Remove the 'selected' class from all the cards except the current one
    cards.forEach((card) => {
      if (card !== selectedCardRef.current) {
        if (card.classList.contains('selected')) {
          card.classList.remove('selected');
        }
        (card.firstChild as HTMLElement).style.border = '1px solid #e2e8f0';
      }
    });

    const card = selectedCardRef.current;
    (card?.firstChild as HTMLElement).style.border = '2px solid #3182ce';
    card?.classList.add('selected');
    selectedCardRef.current?.classList.add('selected');
    handleClick && handleClick();
  };

  let progressValue = 0;
  if (subtiles) {
    const satisfiedSubtiles = subtiles.filter((subtile) => subtile.satisfied);
    progressValue = Math.round((satisfiedSubtiles.length / subtiles.length) * 100);
  }

  if (title === 'Important Notes to Undergraduates (RG 4235)') {
    title = 'Miscellaneous Status Report';
    description = 'This section includes developmental courses, Incomplete grades, and a list of all courses taken';
    progressValue = 0;
  }
  if (title.includes('General Education')) {
    title = 'General Education Requirements';
    description = "General Education Recommended Core Curriculum: Students pursuing a baccalaureate degree must complete the following requirements. For detailed information, please visit the General Education Program webpage. NOTE: Specific departmental requirements may vary.";
  }
  if (title.includes('Honors Distribution')) {
    title = 'Honors Distribution Requirements';
  }

  return (
    <div onClick={toggleCard} className="result-card" ref={selectedCardRef}>
      <Card
        border={'1px'} 
        borderColor={'gray.200'}
        borderRadius={7} 
        width={240}
      >
        <CardBody>
          <Heading fontSize='22px'>{title}</Heading>
          <br />
          <Text fontSize='14px' maxH="200px" overflow="auto">{description}</Text>
          {progressValue > 0 && (<Heading fontSize='18px' mt={3}>Requirement Completion:</Heading>)}
          {progressValue > 0 && (
            <CircularProgress mt={3} value={progressValue} thickness='7px' color='green.400' size='120px'>
              <CircularProgressLabel>{progressValue}%</CircularProgressLabel>
            </CircularProgress>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ResultCard;
