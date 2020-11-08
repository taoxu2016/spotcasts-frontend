import '../styles/fonts.css';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme'

const App = ({ Component, pageProps }) => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<Component {...pageProps}/>
	</ThemeProvider>
)

export default App;
