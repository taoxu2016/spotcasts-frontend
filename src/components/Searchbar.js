import { useState } from "react";
import styled from "styled-components";
import LinkWrapper from "./LinkWrapper";
import SearchResults from "./SearchResults";
import { Logo } from "./Icons";
import { client } from "../utils";

const StyledSearch = styled.div`
  .logo-input {
    display: flex;
    align-items: center;
  }

  .logo-input svg {
    position: relative;
    top: 3px;
    margin-right: 1rem;
    width: 65px;
    height: 65px;
  }

  .brand-input {
    display: flex;
    flex-direction: column;
  }

  .brand-input span {
    font-size: 1.2rem;
    padding-bottom: 0.3rem;
    font-family: ${(props) => props.theme.font3};
    color: ${(props) => props.theme.red};
  }

  input {
    padding: 0.3rem 1rem;
    background-color: ${(props) => props.theme.violet};
    color: ${(props) => props.theme.primaryColor};
    border: 1px solid ${(props) => props.theme.violet};
    border-radius: 4px;
  }
`;

const Searchbar = () => {
  const [searchResults, setSearchResults] = useState([]);

  const searchPodcasts = async (e) => {
    if (e.keyCode === 13) {
      const searchTerm = e.target.value;
      const endpoint = `${process.env.NEXT_PUBLIC_BE}/podcasts?searchTerm=${searchTerm}`;
      const { data } = await client(endpoint);
      setSearchResults(data);
    }
  };

  const inputChange = (e) => {
    if (!e.target.value) {
      setSearchResults([]);
    }
  };

  return (
    <StyledSearch>
      <div className="logo-input">
        <Logo />

        <div className="brand-input">
          <span>SpotCasts</span>
          <input type="text" onKeyUp={searchPodcasts} onChange={inputChange} />
        </div>
      </div>
      <SearchResults searchResults={searchResults} />
    </StyledSearch>
  );
};

export default Searchbar;
