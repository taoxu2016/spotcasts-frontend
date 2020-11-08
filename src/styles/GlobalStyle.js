import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	html {
		font-size: 16px;
		box-sizing: border-box;
	}

	*, *:before, *:after {
		padding: 0;
		margin: 0;
		box-sizing: inherit;
	}

	body {
		width: 80%;
		margin: 2rem auto;
		font-family: ${props => props.theme.font}, sans-serif;
		font-size: 1rem;
		background-color: ${props => props.theme.bg};
		color: ${props => props.theme.primaryColor};
		line-height: 1.6;
	}

	h1, h2, h3, h4, h5, h6 {
		font-weight: normal;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	input, button {
		font-size: 1rem;
		font-family: ${props => props.theme.font};
	}

	input:focus, button:focus, textarea:focus {
		outline: none;
	}
`;

export default GlobalStyle;
