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
  const [isSelected, setIsSelected] = useState(false);

  const toggleCard = () => {
    // Clear selection of any other cards
    const cards = Array.from(document.getElementsByClassName('result-card'));
    cards.forEach((card) => card.classList.remove('selected'));
  
    // Set this card as selected
    setShowSubtitles(!showSubtitles);
    setIsSelected(true);
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
    <div onClick={toggleCard} className="result-card">
      <Card
        border={isSelected ? '2px' : '1px'} 
        borderColor={isSelected ? 'blue.400' : 'gray.200'}
        borderRadius={7} 
        width={240} 
        mr={10} 
        ml={10}
        className={isSelected ? 'selected' : ''}
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
          {/* <Button>See More</Button> */}
        </CardBody>
      </Card>
    </div>
  )
};


export default ResultCard;