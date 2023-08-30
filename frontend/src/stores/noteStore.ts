import { create } from 'zustand';
import { Note as NoteType } from '../utils/types';
import { partialUpdateNote } from '../services/notes';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { parseCookies } from 'nookies';

type NoteState = {
    currentNote: NoteType;
    history: NoteType[];
    reHistory: NoteType[];
    saveNote: (note: NoteType) => Promise<void>;
    localSaveNote: (note: NoteType) => void;
    undo: () => void;
    redo: () => void;
    clean: () => void;
};

export const useNoteStore = create<NoteState>((set) => ({
    currentNote: {} as NoteType,
    history: [],
    reHistory: [],

    saveNote: async (note: NoteType) => {
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
                partialUpdateNote(
                    mergedNote.id,
                    mergedNote,
                    cookies[AUTH_COOKIE_NAME],
                );

            return {
                currentNote: mergedNote,
                history: [mergedNote, ...currentState.history],
                reHistory: [],
            };
        });
    },

    localSaveNote: (note: NoteType) => {
        set((state) => ({
            currentNote: note,
            history: [note, ...state.history],
            reHistory: [],
        }));
    },

    undo: () => {
        set((state) => {
            if (state.history.length === 0) return state;
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
            if (state.reHistory.length === 0) return state;
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
            currentNote: {} as NoteType,
            history: [],
            reHistory: [],
        }));
    },
}));
