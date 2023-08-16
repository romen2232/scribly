import { SearchBar } from '../components/SearchBar';
import { TreeItem } from '../components/TreeItem';
import { Header } from '../components/Header';
import { useEffect } from 'react';
import { listFolders } from '../services/folders';
import { rootFolder } from '../services/folders';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import {parseCookies} from 'nookies'
import {useState} from 'react'
import { Folder, Note } from '../utils/types';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { Tree } from '../components/Tree';
import Loader from './loader';


interface IFolderProps {}

const Folders: React.FunctionComponent<IFolderProps> = () => {

    const cookies=parseCookies()
    const [folders, setFolders] = useState<Folder>()

    useEffect(()=>{
        rootFolder(cookies[AUTH_COOKIE_NAME])
            .then((response)=>{
            setFolders(response)
        console.log(folders)})
            .catch((error) => {
                toast.error(t(error.message));
            });
    }, [])


    return (
        <>
            <Header />
            <h1 className="flex w-full justify-center py-10 text-3xl">
                Folders
            </h1>
            <SearchBar />
            {folders!==undefined?(
            <Tree rootFolder={folders}/>
            ):(
                <Loader/>
            )}
        </>
    );
};

export default Folders;
