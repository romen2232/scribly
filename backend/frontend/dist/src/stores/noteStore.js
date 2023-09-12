import { create } from 'zustand';
import { partialUpdateNote } from '../services/notes';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { parseCookies } from 'nookies';
export const useNoteStore = create((set) => ({
    currentNote: {},
    history: [],
    reHistory: [],
    saveNote: async (note) => {
        const cookies = parseCookies();
        // Update the state
        set((currentState) => {
            // Merge current note with new note for a partial update
            const mergedNote = {
                ...currentState.currentNote,
                ...note,
                noteLastModified: new Date().toISOString(),
            };
            if (mergedNote.id)
                // This will save to the backend but we won't await here so as to not delay the state update.
                partialUpdateNote(mergedNote.id, mergedNote, cookies[AUTH_COOKIE_NAME]);
            return {
                currentNote: mergedNote,
                history: [mergedNote, ...currentState.history],
                reHistory: [],
            };
        });
    },
    localSaveNote: (note) => {
        set((state) => ({
            currentNote: note,
            history: [note, ...state.history],
            reHistory: [],
        }));
    },
    undo: () => {
        set((state) => {
            if (state.history.length === 0)
                return state;
            const [lastSaved, ...rest] = state.history;
            return {
                currentNote: lastSaved,
                history: rest,
                reHistory: [state.currentNote, ...state.reHistory],
            };
        });
    },
    redo: () => {
        set((state) => {
            if (state.reHistory.length === 0)
                return state;
            const [lastSaved, ...rest] = state.reHistory;
            return {
                currentNote: lastSaved,
                history: [state.currentNote, ...state.history],
                reHistory: rest,
            };
        });
    },
    clean: () => {
        set(() => ({
            currentNote: {},
            history: [],
            reHistory: [],
        }));
    },
}));
