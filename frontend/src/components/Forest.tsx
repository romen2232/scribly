import { ForestDoor } from './ForestDoor';
import { useForestStore } from '../stores/forestStore';
import { ForestType } from '../utils/types';

export interface IForestProps {
    onClose: () => void;
}

export function Forest(props: IForestProps) {
    const { setForest } = useForestStore();
    const forestClick = (forest: ForestType) => {
        setForest(forest);
        props.onClose();
    };

    return (
        <section>
            <ForestDoor onClick={() => forestClick('poetry')} />
            <ForestDoor onClick={() => forestClick('prose')} />
            <ForestDoor onClick={() => forestClick('script')} />
        </section>
    );
}
