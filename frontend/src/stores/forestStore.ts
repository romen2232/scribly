import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ForestType = 'poetry' | 'prose' | 'script';
export interface ForestStore {
    forest: ForestType;
    setForest: (forest: ForestType) => void;
}

/**
 * This is the store for the forest. It is used to keep track of which forest the user is currently in. It is persisted in session storage so that the user's forest is remembered when they refresh the page.
 */
const forestPersist = persist<ForestStore>(
    (set) => ({
        forest: 'poetry',
        setForest: (newForest) => set(() => ({ forest: newForest })),
    }),
    {
        name: 'forest-storage',
        storage: createJSONStorage(() => sessionStorage),
    },
);

// https://stackoverflow.com/questions/76744178/typescript-error-with-zustands-persist-middleware-and-statecreator-in-react-app/76744211#76744211
export const useForestStore = create<ForestStore>()(forestPersist);
