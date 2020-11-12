import { useState, createContext } from "react";

export const DrawerContext = createContext(null);

export const DrawerProvider = ({ children }) => {
	const [drawer, setDrawer] = useState({ open: false });

	return (
		<DrawerContext.Provider value={{ drawer, setDrawer }}>
			{children}
		</DrawerContext.Provider>
	);
};
