import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCategoryStore } from '../stores/categoryStore';
import { CategoryDoor } from './CategoryDoor';
export function Category(props) {
    const { setCategory } = useCategoryStore();
    const categoryClick = (category) => {
        setCategory(category);
        props.onClose();
    };
    return (_jsxs("section", { children: [_jsx(CategoryDoor, { onClick: () => categoryClick('POETRY') }), _jsx(CategoryDoor, { onClick: () => categoryClick('PROSE') }), _jsx(CategoryDoor, { onClick: () => categoryClick('SCRIPT') })] }));
}
