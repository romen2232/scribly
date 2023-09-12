import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
/**
 * This is the store for the category. It is used to keep track of which category the user is currently in. It is persisted in session storage so that the user's category is remembered when they refresh the page.
 */
const categoryPersist = persist((set) => ({
    category: 'POETRY',
    setCategory: (newCategory) => set(() => ({ category: newCategory })),
}), {
    name: 'category-storage',
    storage: createJSONStorage(() => sessionStorage),
});
// https://stackoverflow.com/questions/76744178/typescript-error-with-zustands-persist-middleware-and-statecreator-in-react-app/76744211#76744211
export const useCategoryStore = create()(categoryPersist);
