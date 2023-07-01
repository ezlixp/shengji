// import React, { useCallback, useMemo, useState } from "react";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import amongusConfig from "./config/amongusConfig.jsx";
// import linkConfig from "./config/linkConfig.jsx";
// import { useBG } from "../../contexts/backgroundContext.js";

// export default function ParticlesBackground() {
// 	const { currentBackground } = useBG();
// 	const options = useMemo(() => {
// 		switch (currentBackground) {
// 			case 0:
// 				return linkConfig;
// 			case 1:
// 				return amongusConfig;
// 			default:
// 				return amongusConfig;
// 		}
// 	}, []);
// 	const particlesInit = useCallback((engine) => {
// 		loadFull(engine);
// 	}, []);
// 	return <Particles init={particlesInit} options={options} />;
// }
