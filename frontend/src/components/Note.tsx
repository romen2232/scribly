import * as React from 'react';
import { useAutosave } from '../hooks/useAutosave';
import { useState } from 'react';
import { FaFolder } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export interface INoteProps {
    noteId?: number;
    noteName?: string;
    noteContent?: string;
    noteImage?: string;
    noteLast_modified?: Date;
    public?: boolean;
    noteAverageRating?: number;
    tags?: string;
    task?: number | null;
    challenge?: number | null;
    folder?: {
        id: number;
        folderName: string;
        folderDescription: string;
        parent: number | null;
    };
}

export function Note({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    noteId = 0,
    noteName = '',
    noteContent = '',
    noteLast_modified = new Date(),
    folder = { id: 0, folderName: '', folderDescription: '', parent: null },
}: INoteProps) {
    const [title, setTitle] = useState(noteName);
    const [content, setContent] = useState(noteContent);
    const [lastModified, setLastModified] = useState(noteLast_modified);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [history, setHistory] = useState(content);
    useAutosave({
        data: content,
        onSave: (data: string) => {
            setHistory(data);
            setLastModified(new Date());
        },
        interval: 5000,
    });
    return (
        <div className="h-full">
            <div className="flex justify-between">
                <div>
                    {/* Title  focused by default */}
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="h-16 w-full bg-tiviWhite p-16 text-7xl placeholder-gray-700 focus:outline-none "
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {/* Date */}
                    <div className="pointer-events-none flex justify-between px-16">
                        <p className="text-2xl text-gray-500">
                            {lastModified.toLocaleString('es-ES', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            })}
                        </p>
                    </div>
                </div>
                <div
                    className={`hover:bg-hover:shadow m-16 flex h-min cursor-pointer items-center justify-between rounded-md p-3 transition duration-300 ease-in-out hover:bg-tiviElectricPurple-50 hover:shadow-lg`}
                >
                    <Link to={`/folders`}>
                        <div className="flex items-center">
                            <FaFolder className="h-10 w-10" />

                            <div className="px-3 text-lg">
                                <h4 className="font-bold">
                                    {folder.folderName}
                                </h4>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            {/* Content */}
            <textarea
                name="text"
                id="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-full w-full bg-tiviWhite p-16 font-sans text-2xl focus:placeholder-gray-500 focus:outline-none"
                placeholder="En algún lugar de la Mancha, de cuyo nombre no quiero acordarme..."
            ></textarea>
        </div>
    );
}
