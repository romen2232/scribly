import { useAutosave } from '../hooks/useAutosave';
import { useEffect, useState } from 'react';
import { FaFolder } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Folder, Note as NoteType } from '../utils/types';
import { t } from 'i18next';
import { formatDate } from '../utils/functions';
import { useNoteStore } from '../stores/noteStore';

export interface INoteProps {
    note: NoteType;
    folder?: Folder;
    onNoteChange?: (note: NoteType) => void;
}

export function Note({ note, folder, onNoteChange }: INoteProps) {
    const { currentNote, saveNote, localSaveNote, undo, redo } = useNoteStore();
    const [newNote, setNewNote] = useState(note);

    useEffect(() => {
        localSaveNote(note);
    }, [note, localSaveNote]);

    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                if (e.key === 's') {
                    e.preventDefault();
                    await saveNote(newNote);
                    if (onNoteChange) {
                        onNoteChange(newNote);
                    }
                } else if (e.key === 'z') {
                    e.preventDefault();
                    undo();
                    setNewNote(currentNote); // to reflect the undone changes
                } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
                    e.preventDefault();
                    redo();
                    setNewNote(currentNote); // to reflect the redone changes
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [newNote, saveNote, undo, redo, currentNote]);

    //TODO: change this to not have to call the hook 2 times
    useAutosave({
        data: newNote.noteContent ?? '',
        onSave: async (data: string) => {
            const updatedNote = {
                ...newNote,
                noteLastModified: formatDate(new Date()),
                noteContent: data,
            };
            await saveNote(updatedNote);
            setNewNote(updatedNote);
        },
        interval: 60000,
        saveOnUnmount: true,
    });
    useAutosave({
        data: newNote.noteName ?? '',
        onSave: async (data: string) => {
            const updatedNote = {
                ...newNote,
                noteLastModified: formatDate(new Date()),
                noteName: data,
            };
            localSaveNote(updatedNote);
            setNewNote(updatedNote);
        },
        interval: 5000,
        saveOnUnmount: true,
    });

    return (
        <div className="h-full">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="h-16 w-full p-16 text-7xl placeholder-gray-500 focus:placeholder-gray-600 focus:outline-none"
                        placeholder="Título"
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
                            {newNote.noteLastModified}
                        </p>
                    </div>
                </div>
                {folder?.id && (
                    <div
                        className={`hover:bg-hover:shadow m-16 flex h-min cursor-pointer items-center justify-between rounded-md p-3 duration-300 ease-in-out transition hover:text-tiviElectricPurple-100 hover:shadow-lg`}
                    >
                        {/* TODO: Do this inside a modal */}
                        <Link to={t(`/folders`)}>
                            <div className="flex items-center">
                                <FaFolder className="h-10 w-10" />
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
            </div>
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
                className="h-full w-full  p-16 font-sans text-2xl focus:placeholder-gray-500 focus:outline-none"
                placeholder="En algún lugar de la Mancha, de cuyo nombre no quiero acordarme..."
            ></textarea>
        </div>
    );
}
