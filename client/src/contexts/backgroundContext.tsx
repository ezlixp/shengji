import React, { createContext, useContext, useState } from "react";

type backgroundContextType = {
	currentBackground: number;
	setCurrentBackground: React.Dispatch<React.SetStateAction<number>>;
};

type ChildrenProps = {
	children: React.ReactNode;
};

const BackgroundContext = createContext<backgroundContextType>(
	{} as backgroundContextType
);

export function useBG() {
	return useContext(BackgroundContext);
}

export default function BackgroundProvider({ children }: ChildrenProps) {
	const [currentBackground, setCurrentBackground] = useState(0); // 0 is normal, 1 is dev (amongus);

	const value = {
		currentBackground,
		setCurrentBackground,
	};
	return (
		<BackgroundContext.Provider value={value}>
			{children}
		</BackgroundContext.Provider>
	);
}
