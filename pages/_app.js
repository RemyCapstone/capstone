import '../styles/globals.css'
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';

import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react";
import FormLabel from '../styles/FormLabel.ts';
import Input from '../styles/Input.ts';

import Layout from '../components/Layout';
import { SessionProvider } from 'next-auth/react';

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};
/* Customized Chakra Styles */
const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
              {
                ...activeLabelStyles,
              },
            
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
    FormLabel,
    Input
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
      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp
