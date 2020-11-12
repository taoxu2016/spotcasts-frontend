import "../styles/fonts.css";
import { useContext } from "react";
import Head from "next/head";

// providers
import { ThemeProvider } from "styled-components";
import { DrawerProvider } from "../context/DrawerContext";

import GlobalStyle from "../styles/GlobalStyle";
import Drawer from "../components/Drawer";
import { darkTheme } from "../styles/theme";

const App = ({ Component, pageProps }) => {
  return (
    <DrawerProvider>
      <ThemeProvider theme={darkTheme}>
        <Head>
          <title>SpotCasts</title>
          <link rel="icon" href="/podcast.svg" />
        </Head>
        <GlobalStyle />
        <Drawer />
        <Component {...pageProps} />
      </ThemeProvider>
    </DrawerProvider>
  );
};

export default App;
