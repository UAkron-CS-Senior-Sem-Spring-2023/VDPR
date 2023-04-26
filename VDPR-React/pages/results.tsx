import {
  Text,
  Box,
  Heading,
  VStack,
  Divider,
  Button,
  Icon,
} from "@chakra-ui/react"
import { useRouter } from 'next/router'
import ResultCard from "../components/resultCard";
import { Carousel } from '@trendyol-js/react-carousel';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import SubtileCard from "@/components/SubtileCard";

// right arrow react element
let RightArrow = (
  // use react icons ChevronLeftIcon
  <ChevronRightIcon w={20} h={200} />
);

// left arrow react element
let LeftArrow = (
  <ChevronLeftIcon w={20} h={200} />
);

interface Subtile {
  name: string;
  otherRequirements: string;
  satisfied: boolean;
  coursesNeeded: number;
  coursesTaken: number;
  creditsNeeded: number;
  creditsTaken: number;
  courses: any[];
}

interface ResultCard {
  title: string;
  description: string;
  subtiles?: Subtile[];
  name: any;
  otherRequirements: string;
  subTiles?: Subtile[];
}

export const Results = () => {
  const router = useRouter();
  const queryKey = 'results';
  const apiData = (() => {
    const query = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`));
    if (!query) return {};
    if (typeof query === 'string') {
      return JSON.parse(query);
    }
    if (Array.isArray(query)) {
      return JSON.parse(query[0]);
    }
    return {};
  })();

  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleWindowSizeChange = debounce(() => {
      setWidth(typeof window !== "undefined" ? window.innerWidth : 0);
    }, 65);

    if (typeof window !== "undefined") {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      };
    }
  }, []);

  const isMobile = width <= 768;
  const show = isMobile ? 1.2 : 2.8;
  const slide = isMobile ? 1 : 2;
  const rArrow = isMobile ? null : RightArrow;
  const lArrow = isMobile ? null : LeftArrow;

  if (!apiData.tiles) {
    return (
      <Box textAlign="center" mb={200}>
        <Text>
          No data found to display. Try uploading your pdf again.
        </Text>
      </Box>
    );
  }
  else {
    let gradeMapping: { [index: string]: any } = {
      "A": 4,
      "A-": 3.7,
      "B+": 3.3,
      "B": 3,
      "B-": 2.7,
      "C+": 2.3,
      "C": 2,
      "C-": 1.7,
      "D+": 1.3,
      "D": 1,
      "D-": 0.7,
      "F": 0
    };

    let gradePoints = 0;
    let totalCredits = 0;
    for (const course of apiData.student.coursesTaken) {
      if (course.grade in gradeMapping) {

        gradePoints += gradeMapping[course.grade] * course.units;
        totalCredits += 1 * course.units;
      }
    }
    const gpa = gradePoints / totalCredits;

    return (
      <Box textAlign="center" mb={200}>
        <VStack spacing={3}>
          <Heading>
            Transcript Results
          </Heading>
          <Heading size={"md"}> GPA: {gpa.toFixed(4)}</Heading>
          {apiData.tiles && (
            <Carousel
              show={show}
              slide={slide}
              transition={0.5}
              infinite={true}
              dynamic={true}
              rightArrow={rArrow}
              leftArrow={lArrow}
              swiping={true}
            >
              {apiData.tiles && apiData.tiles.map((tile: ResultCard, index: number) => (
                <ResultCard
                  key={`tile-${index}`}
                  title={tile.name}
                  description={tile.otherRequirements}
                  subtiles={tile.subTiles}
                  handleClick={() => setSelectedCard(tile.name)}
                />
              ))}
            </Carousel>
          )}
          <Divider />
          {/* Subtiles should render here */}
          {/* the subTiles shown should only be those of the selected tile */}
          {apiData.tiles && apiData.tiles.map((tile: ResultCard, index: number) => (
            <Box key={`subtile-${index}`} width={"full"}>
              {tile.subTiles && tile.subTiles.map((subtile: Subtile, index: number) => (
                <SubtileCard
                  key={`subtile-${index}`}
                  parent={tile.name}
                  tile={subtile}
                  selected={selectedCard === tile.name}
                  isMobile={isMobile}
                />
              ))}
            </Box>
          ))}
        </VStack>
      </Box>
    )
  }
};

export default Results;
