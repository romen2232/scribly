import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Note } from '../components/Note';
import { Folder, Note as NoteType } from '../utils/types';
import { rootFolder } from '../services/folders';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { createNote } from '../services/notes';

interface INewProps {}

const New: React.FunctionComponent<INewProps> = () => {
    
    const cookies=parseCookies();
    const [folder, setFolder] = useState({} as Folder)
    const [note, setNote] = useState({} as NoteType);


    useEffect(() => {
        const getFolder = async () => {
            const folder = await rootFolder(cookies[AUTH_COOKIE_NAME]);
            setFolder(folder);
        }
        const newNote = async () => {
            if(folder.id!==undefined){
                const note = await createNote({
                    folder: folder.id,
                }, cookies[AUTH_COOKIE_NAME]);
                setNote(note);
            }
        }

        getFolder();
        newNote();
    }, []);

    return (
        <div className="h-full max-h-screen overflow-hidden text-tiviBlack">
            <Header />
            <main className=" flex h-full flex-col">
                <Note folder={folder} note={note}/>
            </main>
        </div>
    );
};

export default New;
