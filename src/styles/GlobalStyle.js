import { createGlobalStyle } from "styled-components";

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

	*::-webkit-scrollbar {
		width: 6px;
	}

	*::-webkit-scrollbar-track {
		background-color: ${props => props.theme.violet};
	}

	*::-webkit-scrollbar-thumb {
		background-color: ${props => props.theme.pink};
		border-radius: 4px;
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

	li {
		list-style: none;
	}

	input, button {
		font-size: 1rem;
		font-family: ${props => props.theme.font};
	}

	input:focus, button:focus, textarea:focus {
		outline: none;
	}

	button, svg {
		cursor: pointer;
	}

	/* global classes */
	.show-notes {
		padding: 1rem;
		max-height: 500px;
		overflow-y: scroll;
		scrollbar-width: none;
		padding-bottom: 5rem;
		line-height: 1.8;
		font-size: 0.9rem;
	}

	.show-notes strong {
		font-weight: normal;
	}

	.show-notes::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	.show-notes p,
	.show-notes ul,
	.show-notes li {
		padding-bottom: 0.5rem;
	}

	.show-notes a {
		color: ${props => props.theme.yellow};
	}

	.show-notes img, .show-notes hr{
		display: none;
	}
`;

export default GlobalStyle;
