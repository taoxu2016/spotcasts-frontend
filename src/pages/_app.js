import "../styles/fonts.css";
import { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { PlayerProvider } from "../context/PlayerContext";
import GlobalStyle from "../styles/GlobalStyle";
import PlayerDrawer from '../components/PlayerDrawer';
import theme from "../styles/theme";

const App = ({ Component, pageProps }) => {
	return (
		<PlayerProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<PlayerDrawer />
				<Component {...pageProps} />
			</ThemeProvider>
		</PlayerProvider>
	);
};

export default App;
