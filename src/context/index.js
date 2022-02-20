import { createContext } from "react";
const AppContext = createContext({
	data: { lists: null },
	refresh: () => console.log("refresh"),
});

export default AppContext;
