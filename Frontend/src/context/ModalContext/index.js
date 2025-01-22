import React from "react";
import MatchingProjectsModal from "./components/MatchingProjectsModal";
import MatchingTalentsModal from "./components/MatchingTalentsModal";
export const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
	return (
		<ModalContext.Provider>
			<MatchingProjectsModal />
			<MatchingTalentsModal />
			{children}
		</ModalContext.Provider>
	);
};
