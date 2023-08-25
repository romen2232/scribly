import { Category as CategoryType } from '../utils/types';
import { useCategoryStore } from '../stores/categoryStore';
import { CategoryDoor } from './CategoryDoor';

export interface ICategoryProps {
    onClose: () => void;
}

export function Category(props: ICategoryProps) {
    const { setCategory } = useCategoryStore();
    const categoryClick = (category: CategoryType) => {
        setCategory(category);
        props.onClose();
    };

    return (
        <section>
            <CategoryDoor onClick={() => categoryClick('POETRY')} />
            <CategoryDoor onClick={() => categoryClick('PROSE')} />
            <CategoryDoor onClick={() => categoryClick('SCRIPT')} />
        </section>
    );
}
