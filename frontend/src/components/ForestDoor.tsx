import * as React from 'react';

export interface IForestDoorProps {
    onClick: () => void;
}

export function ForestDoor(props: IForestDoorProps) {
    return (
        <button onClick={props.onClick}>
            <img src="https://i.imgur.com/5X9Z3XG.png" alt="forest door" />
        </button>
    );
}
