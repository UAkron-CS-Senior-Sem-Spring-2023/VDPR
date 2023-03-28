import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <Flex as="header" w="full" align="center">
      <Button as="a" href="/" variant="ghost" p={0} mr={4} size="md"> 
        <Heading>VDPR</Heading>
      </Button>
      <Box ml="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
}
