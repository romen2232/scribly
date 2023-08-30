import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Note } from '../components/Note';
import { Folder, Note as NoteType } from '../utils/types';
import { rootFolder, retrieveFolder } from '../services/folders';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { createNote, retrieveNote } from '../services/notes';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface INewProps {}

const New: React.FunctionComponent<INewProps> = () => {
    const cookies = parseCookies();
    const [folder, setFolder] = useState({} as Folder);
    const [note, setNote] = useState({} as NoteType);
    const [searchParam, setSearchParam] = useSearchParams();
    const newQueryParameters: URLSearchParams = new URLSearchParams(
        window.location.search,
    );
    const { t } = useTranslation();

    const [folderId, setFolderId] = useState(
        Number(searchParam.get(t('folderId')) ?? -1),
    );
    const [noteId, setNoteId] = useState(
        Number(searchParam.get(t('noteId')) ?? -1),
    );

    useEffect(() => {
        const getFolder = async () => {
            //Check if folderId is a number
            if (isNaN(folderId)) {
                setFolderId(-1);
            }
            if (folderId !== -1) {
                try {
                    const folder = await retrieveFolder(
                        folderId,
                        cookies[AUTH_COOKIE_NAME],
                    );
                    setFolder(folder);
                    return;
                } catch (e) {
                    setFolderId(-1);
                }
            }
            const root = await rootFolder(cookies[AUTH_COOKIE_NAME]);
            setFolder(root);
            if (root.id)
                newQueryParameters.set(t('folderId'), root.id.toString());
            setSearchParam(newQueryParameters);
        };
        const getNote = async () => {
            if (noteId !== -1) {
                try {
                    const noteToEdit = await retrieveNote(
                        noteId,
                        cookies[AUTH_COOKIE_NAME],
                    );
                    if (noteToEdit.id) setNoteId(noteToEdit.id);
                    setNote(noteToEdit);
                    return;
                } catch (e) {
                    setNoteId(-1);
                }
            }
            const note = await createNote(
                {
                    folder: folder.id,
                },
                cookies[AUTH_COOKIE_NAME],
            );
            setNote(note);
            if (note.id) {
                setNoteId(note.id);
                newQueryParameters.set(t('noteId'), note.id.toString());
                setSearchParam(newQueryParameters);
            }
        };

        getFolder();
        getNote();
    }, []);

    return (
        <div className="h-full max-h-screen overflow-hidden text-tiviBlack">
            <Header />
            <main className=" flex h-full flex-col">
                <Note folder={folder} note={note} />
            </main>
        </div>
    );
};

export default New;
