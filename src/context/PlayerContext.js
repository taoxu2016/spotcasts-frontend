import { useState, createContext } from "react";

export const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
	const [player, setPlayer] = useState({ open: false });
	return (
		<PlayerContext.Provider value={{ player, setPlayer }}>
			{children}
		</PlayerContext.Provider>
	);
};
