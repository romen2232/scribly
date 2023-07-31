import * as React from 'react';

export interface ISplashProps {
    children: React.ReactNode;
}

export function Splash(props: ISplashProps) {
    return <div>{props.children}</div>;
}
