import { useAutosave } from '../hooks/useAutosave';
import { useEffect, useState } from 'react';
import { FolderIcon } from '../assets/icons/Icons';
import { Link } from 'react-router-dom';
import { Folder, Note as NoteType } from '../utils/types';
import { t } from 'i18next';
import { formatDate } from '../utils/functions';
import { useNoteStore } from '../stores/noteStore';
import { destroyNote } from '../services/notes';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

export interface INoteProps {
    note: NoteType;
    folder?: Folder;
    onNoteChange?: (note: NoteType) => void;
}

export function Note({ note, folder, onNoteChange }: INoteProps) {
    const { currentNote, saveNote, undo, redo } = useNoteStore();
    const [newNote, setNewNote] = useState({} as NoteType);
    const cookies = parseCookies();

    // Update note as soon as it's passed as prop
    useEffect(() => {
        setNewNote(note);
    }, [note]);

    // Save note on unmount
    useEffect(() => {
        return () => {
            console.log(newNote);
            handleUnmount(newNote);
        };
    }, []);

    // Keyboard shortcuts for saving, undo and redo
    useKeyboardShortcuts({
        save: async () => {
            await saveNote(newNote);
            if (onNoteChange) {
                onNoteChange(newNote);
            }
        },
        undo: () => {
            undo();
            setNewNote(currentNote);
        },
        redo: () => {
            redo();
            setNewNote(currentNote);
        },
    });

    // Autosave note every minute
    useAutosave({
        data: newNote.noteContent ?? '',
        onSave: async (data: string) => {
            const updatedNote = {
                ...newNote,
                noteLastModified: new Date().toISOString(),
                noteContent: data,
            };
            await saveNote(updatedNote);
            setNewNote(updatedNote);
        },
        interval: 60000,
    });

    /**
     * Save note on beforeunload
     * Destroy note if it's empty
     */
    const handleUnmount = async (note: NoteType) => {
        if (note.noteContent === '' && note.noteName === '' && note.id) {
            await destroyNote(note.id, cookies[AUTH_COOKIE_NAME]);
        } else {
            await saveNote({
                ...note,
                noteLastModified: formatDate(new Date()),
            });
        }
    };

    return (
        <div className="h-full">
            <header className="flex items-center justify-between">
                <div className="w-full">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="h-16 w-full p-16 text-7xl placeholder-gray-500 focus:placeholder-gray-600 focus:outline-none"
                        placeholder="Título"
                        autoFocus
                        value={newNote.noteName ?? ''}
                        onChange={(e) =>
                            setNewNote({
                                ...newNote,
                                noteName: e.target.value,
                            })
                        }
                    />
                    {/* Date */}
                    <div className="pointer-events-none flex justify-between px-16">
                        <p className="text-2xl text-gray-500">
                            {' '}
                            {formatDate(
                                new Date(newNote.noteLastModified ?? ''),
                            )}
                        </p>
                    </div>
                </div>
                {folder?.id && (
                    <div
                        className={`hover:bg-hover:shadow m-16 flex h-min cursor-pointer items-center justify-between rounded-md p-3 duration-300 ease-in-out transition hover:text-tiviElectricPurple-100 hover:shadow-lg`}
                    >
                        {/* TODO: Do this inside a modal */}
                        <Link to={t(`/folders`)} tabIndex={2}>
                            <div className="flex items-center">
                                <FolderIcon className="h-10 w-10" />
                                {(folder?.depth ?? 0) > 0 && (
                                    <div className="px-3 text-lg">
                                        <h4 className="font-bold">
                                            {folder?.folderName}
                                        </h4>
                                    </div>
                                )}
                            </div>
                        </Link>
                    </div>
                )}
            </header>
            {/* Content */}
            <textarea
                name="text"
                id="text"
                value={newNote.noteContent ?? ''}
                onChange={(e) =>
                    setNewNote({
                        ...newNote,
                        noteContent: e.target.value,
                    })
                }
                tabIndex={1}
                className="h-full w-full  p-16 font-sans text-2xl focus:placeholder-gray-500 focus:outline-none"
                placeholder="En algún lugar de la Mancha, de cuyo nombre no quiero acordarme..."
            ></textarea>
        </div>
    );
}
