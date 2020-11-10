import "../styles/fonts.css";
import { useContext } from "react";
import Head from 'next/head';
import { ThemeProvider } from "styled-components";
import { PlayerProvider } from "../context/PlayerContext";
import GlobalStyle from "../styles/GlobalStyle";
import PlayerDrawer from '../components/PlayerDrawer';
import theme from "../styles/theme";

const App = ({ Component, pageProps }) => {
	return (
		<PlayerProvider>
			<Head>
				<title>SpotCasts</title>
				<link rel="icon" href="/podcast.svg" />
			</Head>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<PlayerDrawer />
				<Component {...pageProps} />
			</ThemeProvider>
		</PlayerProvider>
	);
};

export default App;
