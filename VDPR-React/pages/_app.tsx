import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app';
import Head from "next/head";
import customTheme from "../styles/customTheme";
import Layout from "../components/layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
  }
