import {
  Text,
  Box,
  Heading,
  VStack,
  Button,
  Icon,
} from "@chakra-ui/react"
import { useRouter } from 'next/router'
import ResultCard from "../components/resultCard";
import { Carousel } from '@trendyol-js/react-carousel';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'

// right arrow react element
const RightArrow = (
  // use react icons ChevronLeftIcon
  <ChevronRightIcon w={20} h={200} />
);

// left arrow react element
const LeftArrow = (
  <ChevronLeftIcon w={20} h={200} />
);

interface ResultCard {
  title: string;
  description: string;
  subtiles?: Subtile[];
}

 export const Results = () => {
  const router = useRouter();
  const queryKey = 'results';
  const apiData = JSON.parse(router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))) || {};

  console.log('apiData:', apiData);
  console.log('tiles:', apiData?.tiles);

  return (
  <Box textAlign="center" mb={200}>
      <VStack spacing={3}>
        <Heading>
          Transcript Results
        </Heading>
        <Carousel 
          show={2.2} 
          slide={2} 
          transition={0.5} 
          infinite={true} 
          dynamic={true}
          rightArrow={RightArrow} 
          leftArrow={LeftArrow}
          swiping={true}
        >
        {apiData.tiles && apiData.tiles.map((tile: ResultCard, index: number) => (
            <ResultCard
              key={`tile-${index}`}
              title={tile.name}
              description={tile.otherRequirements}
              subtiles={tile.subtiles}
            />
          ))}
        </Carousel>
      </VStack>
  </Box>
  )
};

export default Results;
