import { useState } from "react";
import styled from "styled-components";
import { stripStr, client } from "../utils";

const StyledSearch = styled.div`
	input {
		padding: 0.5rem 1rem;
		background-color: ${props => props.theme.violet};
		color: ${props => props.theme.primaryColor};
		border: 1px solid ${props => props.theme.violet};
		border-radius: 4px;
	}

	*::-webkit-scrollbar {
		width: 6px;
	}

	*::-webkit-scrollbar-track {
		background-color: ${props => props.theme.violet};
	}

	*::-webkit-scrollbar-thumb {
		background-color: #BF4863;
		border-radius: 4px;
	}

	.search-results {
		width: 350px;
		max-height: 350px;
		overflow-y: scroll;
		margin-top: 1rem;
		background-color: ${props => props.theme.violet};
		border-radius: 4px;
	}

	.search-result {
		padding: 1rem;
		display: flex;
		font-size: 0.9rem;
	}

	.search-result img {
		width: 78px;
		height: 78px;
		margin-right: 0.8rem;
	}

	.search-result span {
		display: block;
	}

	.search-result span:last-child {
		padding-top: 0.2rem;
		opacity: 0.5;
	}
`;

const Searchbar = () => {
	const [searchResults, setSearchResults] = useState([]);

	const searchPodcasts = async e => {
		if (e.keyCode === 13) {
			const searchTerm = e.target.value;
			const { data } = await client(
				`http://localhost:3000/api/podcasts?searchTerm=${searchTerm}`
			);
			setSearchResults(data.results);
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
			{searchResults.length > 0 && (
				<div className="search-results">
					{searchResults.map(searchResult => (
						<div className="search-result" key={searchResult.uuid}>
							<img src={searchResult.image_big} alt="artwork" />
							<div className="search-result-info">
								<span>{stripStr(searchResult.title, 28)}</span>
								<span>{stripStr(searchResult.author, 28)}</span>
							</div>
						</div>
					))}
				</div>
			)}
		</StyledSearch>
	);
};

export default Searchbar;
