import * as React from 'react';
import { useForestStore } from '../stores/forestStore';
import { Phase } from './Phase';

export interface ILearnProps {
    children?: React.ReactNode;
}

export function Learn(props: ILearnProps) {
    const { forest } = useForestStore();
    return (
        <main className="h-full">
            <Phase />
        </main>
    );
}
