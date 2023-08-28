import { SearchBar } from '../components/SearchBar';
import { Header } from '../components/Header';
import { useEffect } from 'react';
import { rootFolder } from '../services/folders';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { Folder } from '../utils/types';
import { toast } from 'react-toastify';
import { Tree } from '../components/Tree';
import Loader from './loader';
import { useTranslation } from 'react-i18next';
import Add from '../components/Add';
interface IFolderProps {}

const Folders: React.FunctionComponent<IFolderProps> = () => {
    const cookies = parseCookies();
    const [folders, setFolders] = useState<Folder>();
    const { t } = useTranslation();

    useEffect(() => {
        rootFolder(cookies[AUTH_COOKIE_NAME])
            .then((response) => {
                setFolders(response);
            })
            .catch((error) => {
                toast.error(t(error.message));
            });
    }, []);

    return (
        <>
            <Header />
            <h1 className="flex w-full justify-center py-10 text-3xl">
                {t('folders.title')}
            </h1>
            <nav className="flex w-full px-12">
                <SearchBar />
                <Add />
            </nav>
            {folders !== undefined ? <Tree rootFolder={folders} /> : <Loader />}
        </>
    );
};

export default Folders;
