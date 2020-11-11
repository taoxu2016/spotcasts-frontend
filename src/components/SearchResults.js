import { useContext } from 'react'
import styled from "styled-components";
import LinkWrapper from "./LinkWrapper";
import { stripStr } from "../utils";

const Wrapper = styled.div`
	position: absolute;
	z-index: 1;
	width: 350px;
	margin-top: 1rem;
	background-color: ${props => props.theme.black};
	border-radius: 4px;
	box-shadow: ${props => props.theme.bs1};

	.search-result {
		padding: 1rem;
		display: flex;
		font-size: 0.9rem;
	}

	.search-result img {
		width: 50px;
		height: 50px;
		border-radius: 4px;
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

const SearchResults = ({ searchResults }) => {
	return (
		<Wrapper>
			{searchResults.map(searchResult => (
				<LinkWrapper
					key={searchResult.uuid}
					href={`/podcasts/${searchResult.uuid}`}
				>
					<div className="search-result">
						<img src={searchResult.image_big} alt="artwork"/>
						<div className="search-result-info">
							<span>{stripStr(searchResult.title, 28)}</span>
							<span>{stripStr(searchResult.author, 28)}</span>
						</div>
					</div>
				</LinkWrapper>
			))}
		</Wrapper>
	);
};

export default SearchResults;
