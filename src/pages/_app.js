import "../styles/fonts.css";
import { useContext } from "react";
import Head from "next/head";

// providers
import { ThemeProvider } from "styled-components";
import { PlayerProvider } from "../context/PlayerContext";

import GlobalStyle from "../styles/GlobalStyle";
import PlayerDrawer from "../components/PlayerDrawer";
import { darkTheme } from "../styles/theme";

const App = ({ Component, pageProps }) => {
	return (
		<PlayerProvider>
			<ThemeProvider theme={darkTheme}>
				<Head>
					<title>SpotCasts</title>
					<link rel="icon" href="/podcast.svg" />
				</Head>
				<GlobalStyle />
				<PlayerDrawer />
				<Component {...pageProps} />
			</ThemeProvider>
		</PlayerProvider>
	);
};

export default App;
