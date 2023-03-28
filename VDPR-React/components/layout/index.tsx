import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box m="0 auto" maxW={800} transition="0.5s ease-out">
      <Meta />
      <Box m={8}>
        <Header />
        <Box as="main" my={22}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
