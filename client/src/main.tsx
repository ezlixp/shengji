import React from "react";
import App from "./App.js";
import "./index.css";
import BackgroundProvider from "./contexts/backgroundContext.js";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<BackgroundProvider>
			<App />
		</BackgroundProvider>
	</React.StrictMode>
);
