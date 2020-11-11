import { useState } from 'react';
import styled from "styled-components";
import LinkWrapper from "./LinkWrapper";
import SearchResults from "./SearchResults";
import { client } from "../utils";

const StyledSearch = styled.div`
	input {
		padding: 0.5rem 1rem;
		background-color: ${props => props.theme.violet};
		color: ${props => props.theme.primaryColor};
		border: 1px solid ${props => props.theme.violet};
		border-radius: 4px;
	}
`;

const Searchbar = () => {
	const [searchResults, setSearchResults] = useState([]);

	const searchPodcasts = async e => {
		if (e.keyCode === 13) {
			const searchTerm = e.target.value;
			const endpoint = `${process.env.NEXT_PUBLIC_BE}/podcasts?searchTerm=${searchTerm}`
			const { data } = await client(endpoint);
			setSearchResults(data);
		}
	};

	const inputChange = e => {
		if (!e.target.value) {
			setSearchResults([]);
		}
	};

	return (
		<StyledSearch>
			<input type="text" onKeyUp={searchPodcasts} onChange={inputChange} />
			<SearchResults searchResults={searchResults}/>
		</StyledSearch>
	);
};

export default Searchbar;
