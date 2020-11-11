import { useState, createContext } from "react";

export const DrawerContext = createContext(null);

export const DrawerProvider = ({ children }) => {
	const [drawer, setDrawer] = useState({ type: "SUBSCRIPTIONS", open: true });

	return (
		<DrawerContext.Provider value={{ drawer, setDrawer }}>
			{children}
		</DrawerContext.Provider>
	);
};
