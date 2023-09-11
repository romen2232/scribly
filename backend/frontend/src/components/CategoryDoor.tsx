export interface ICategoryDoorProps {
    onClick: () => void;
}

export function CategoryDoor(props: ICategoryDoorProps) {
    return (
        <button onClick={props.onClick}>
            <img src="https://i.imgur.com/5X9Z3XG.png" alt="category door" />
        </button>
    );
}
