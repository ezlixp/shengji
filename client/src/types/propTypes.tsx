import React from "react";

export type childrenProps<AdditionalProps = {}> =
    React.PropsWithChildren<AdditionalProps>;

export type defaultProps<AdditionalProps = {}> = AdditionalProps & {
    className?: string;
};
