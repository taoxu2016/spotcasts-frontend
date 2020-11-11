import { useState, createContext } from "react";

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
	const [search, setSearch] = useState([]);

	return (
		<SearchContext.Provider value={{ search, setSearch }}>
			{children}
		</SearchContext.Provider>
	);
};
