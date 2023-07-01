import React from "react";

type childrenProps<AdditionalProps = {}> =
	React.PropsWithChildren<AdditionalProps>;
export default childrenProps;
