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

interface ResultCard {
  title: string;
  description: string;
  subtiles?: Subtile[];
}

 export const Results = () => {
  const router = useRouter();
  const queryKey = 'results';
  const apiData = JSON.parse(router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))) || {};

  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

  const handleWindowSizeChange = debounce(() => {
    setWidth(typeof window !== "undefined" ? window.innerWidth : 0);
  }, 65);

  useEffect(() => {
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

  return (
  <Box textAlign="center" mb={200}>
      <VStack spacing={3}>
        <Heading>
          Transcript Results
        </Heading>
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
};

export default Results;
