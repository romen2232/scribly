import {create} from 'zustand';
import {Note as NoteType} from '../utils/types';
import { updateNote } from '../services/notes';
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
}



export const useNoteStore = create<NoteState>((set) => ({
    currentNote: {} as NoteType,
    history: [],
    reHistory: [],

    saveNote: async (note: NoteType) => {
        const cookies = parseCookies()
        // Store the note in history and update currentNote before saving to backend
        set(state => ({
            currentNote: note,
            history: [note, ...state.history],
            reHistory: []
        }));
        if(typeof note.id === 'undefined') return;
        await updateNote(note.id,{
            ...note,
            noteLastModified: (new Date()).toISOString()
        }, cookies[AUTH_COOKIE_NAME]);
    },

    localSaveNote: (note: NoteType) => {
        set(state => ({
            currentNote: note,
            history: [note, ...state.history],
            reHistory: []
        }));
    },

    undo: () => {
        set(state => {
            if (state.history.length === 0) return state;
            const [lastSaved, ...rest] = state.history;
            return {
                currentNote: lastSaved,
                history: rest,
                reHistory: [state.currentNote, ...state.reHistory]
            };
        });
    },

    redo: () => {
        set(state => {
            if (state.reHistory.length === 0) return state;
            const [lastSaved, ...rest] = state.reHistory;
            return {
                currentNote: lastSaved,
                history: [state.currentNote, ...state.history],
                reHistory: rest
            };
        });
    }
        
}));
