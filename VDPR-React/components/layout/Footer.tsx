import { Box, Link, Text, Button } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <Box as="footer" role="contentinfo">
      <Text fontSize="sm">
        {new Date().getFullYear()} -{" "}
        <Link href="https://github.com/jakethesnake0619" isExternal>
          jakethesnake0619
        </Link>{" "}
        <Link href="https://github.com/nathanhulet" isExternal>
          nathanhulet
        </Link>{" "}
        <Link href="https://github.com/T-pin" isExternal>
          T-pin
        </Link>{" "}
        <Link href="https://github.com/JGoodin-01" isExternal>
          JGoodin-01
        </Link>
      </Text>
      <Link href="https://github.com/UAkron-CS-Senior-Sem-Spring-2023/VDPR" isExternal>
        <Button leftIcon={<AiFillGithub />} size="xs" mt={2}>
          Open in Github
        </Button>
      </Link>
    </Box>
  );
}
