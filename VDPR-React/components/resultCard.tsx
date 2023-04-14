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
}

interface ResultCardProps {
  title: string;
  description: string;
  subtiles?: Subtile[];
}

export const ResultCard = ({ title, description, subtiles }: ResultCardProps) => {
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    // Get all the cards
    const cards = Array.from(document.getElementsByClassName('result-card'));

    // Remove the 'selected' class from all the cards except the current one
    cards.forEach((card) => {
      if (card !== selectedCardRef.current) {
        // if card was selected, remove the 'selected' class
        if (card.classList.contains('selected')) {
          card.classList.remove('selected');
        }
        (card.firstChild as HTMLElement).style.border = '1px solid #e2e8f0';
      }
    });

    // get the card clicked
    const card = selectedCardRef.current;
    // add the border to the card
    (card?.firstChild as HTMLElement).style.border = '2px solid #3182ce';
    // add the 'selected' class to the card
    card?.classList.add('selected');

    // Add the 'selected' class to the current card
    if (isSelected) {
      selectedCardRef.current?.classList.add('selected');
    } else {
      selectedCardRef.current?.classList.remove('selected');
    }
  }, [isSelected]);

  const selectedCardRef = React.useRef<HTMLDivElement | null>(null);

  const toggleCard = () => {
    // Deselect any previously selected card
    setIsSelected(!isSelected);
    setShowSubtitles(!showSubtitles);
  };

  let progressValue = 60;
  if (title === 'Important Notes to Undergraduates (RG 4235)') {
    title = 'Miscellaneous Status Report';
    description = 'This section includes developmental courses, Incomplete grades, and a list of all courses taken';
    progressValue = 0;
  }
  if (title.includes('General Education')) {
    title = 'General Education Requirements';
    description = "General Education Recommended Core Curriculum: Students pursuing a baccalaureate degree must complete the following requirements. For detailed information, please visit the General Education Program webpage. NOTE: Specific departmental requirements may vary.";
    // description = 'This section includes the General Education requirements for your major'; <a href="http://www.uakron.edu/general-education/" target="_blank">General Education Program</a>
  }
  if (title.includes('Honors Distribution')) {
    title = 'Honors Distribution Requirements';
  }

  return (
    <div onClick={toggleCard} className="result-card" ref={selectedCardRef}>
      <Card
        border={isSelected ? '2px' : '1px'} 
        borderColor={isSelected ? 'blue.400' : 'gray.200'}
        borderRadius={7} 
        width={240} 
        mr={10} 
        ml={10}
      >
        <CardBody>
          <Heading fontSize='22px'>{title}</Heading>
          <br />
          <Text fontSize='14px'>{description}</Text>
          {progressValue > 0 && (
            <CircularProgress mt={3} value={progressValue} thickness='7px' color='green.400' size='120px'>
              <CircularProgressLabel>{progressValue}%</CircularProgressLabel>
            </CircularProgress>
          )}
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
        </CardBody>
      </Card>
    </div>
  );
};

export default ResultCard;
