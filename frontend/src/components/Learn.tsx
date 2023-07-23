import * as React from 'react';
import { useForestStore } from '../stores/forestStore';

export interface ILearnProps {
    children?: React.ReactNode;
}

export function Learn(props: ILearnProps) {
    const { forest } = useForestStore();
    return (
        <main>
            <h1>{forest}</h1>
            {props.children}
        </main>
    );
}
