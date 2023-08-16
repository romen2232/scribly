import { useAutosave } from '../hooks/useAutosave';
import { useState } from 'react';
import { FaFolder } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Folder, Note as NoteType } from '../utils/types';
import { t } from 'i18next';
import { formatDate } from '../utils/functions';

export interface INoteProps {
    note: NoteType
    folder: Folder
}

export function Note({note, folder}: INoteProps) {
    const [newNote, setNewNote] = useState(note);
    const [history, setHistory] = useState(newNote.noteContent);


    useAutosave({
        data: newNote.noteContent??'',
        onSave: (data: string) => {
            setHistory(data);
            setNewNote({noteLastModified: formatDate(new Date()), ...newNote})
        },
        interval: 5000,
    });
    return (
        <div className="h-full">
            <div className="flex justify-between items-center">
                <div className='w-full'>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="h-16 w-full p-16 text-7xl placeholder-gray-500 focus:outline-none focus:placeholder-gray-600"
                        placeholder="Título"
                        value={newNote.noteName}
                        onChange={(e) => setNewNote({
                            ...newNote,
                            noteName: e.target.value,
                        })}
                    />
                    {/* Date */}
                    <div className="pointer-events-none flex justify-between px-16">
                        <p className="text-2xl text-gray-500">
                            {newNote.noteLastModified}
                        </p>
                    </div>
                </div>
                <div
                    className={`hover:bg-hover:shadow m-16 flex h-min cursor-pointer items-center justify-between rounded-md p-3 transition duration-300 ease-in-out hover:text-tiviElectricPurple-100 hover:shadow-lg`}
                >
                    {/* TODO: Do this inside a modal */}
                    <Link to={t(`/folders`)}>
                        <div className="flex items-center">
                            <FaFolder className="h-10 w-10" />
                        {(folder?.depth??0) > 0 && (
                            <div className="px-3 text-lg">
                                <h4 className="font-bold">
                                    {folder?.folderName}
                                </h4>
                            </div>
                        )}
                        </div>
                    </Link>
                </div>
            </div>
            {/* Content */}
            <textarea
                name="text"
                id="text"
                value={newNote.noteContent??''}
                onChange={(e) => setNewNote({
                    ...newNote,
                    noteContent: e.target.value,
                })}
                className="h-full w-full  p-16 font-sans text-2xl focus:placeholder-gray-500 focus:outline-none"
                placeholder="En algún lugar de la Mancha, de cuyo nombre no quiero acordarme..."
            ></textarea>
        </div>
    );
}
