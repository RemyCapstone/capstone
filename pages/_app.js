import '../styles/globals.css'
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';

import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react";
import FormLabel from '../styles/FormLabel.ts';
import Input from '../styles/Input.ts';

import Layout from '../components/Layout';

/* Customized Chakra Styles */
const theme = extendTheme({
  components: {
    FormLabel,
    Input,
  },
});

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });

  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });


  return (
    <>
      <Head>

      </Head>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp
