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
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalContent,
    useDisclosure,
} from '@nextui-org/react';

interface IFolderProps {}

const Folders: React.FunctionComponent<IFolderProps> = () => {
    const cookies = parseCookies();
    const [folders, setFolders] = useState<Folder>();
    const { t } = useTranslation();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // const [folderName, setFolderName] = useState('');
    // const [folderDescription, setFolderDescription] = useState('');
    // const [newFolderParentId, setNewFolderParentId] = useState(-1);

    useEffect(() => {
        rootFolder(cookies[AUTH_COOKIE_NAME])
            .then((response) => {
                setFolders(response);
            })
            .catch((error) => {
                toast.error(t(error.message));
            });
    }, []);

    const handleOpenModal = (parentFolderId: number) => {
        // setNewFolderParentId(parentFolderId);
        console.log(parentFolderId);
        onOpen();
    };

    return (
        <>
            <Header />
            <h1 className="flex w-full justify-center py-10 text-3xl">
                {t('folders.title')}
            </h1>
            <nav className="flex w-full items-center px-12">
                <SearchBar />
                <Add
                    parentFolderId={folders?.id ?? -1}
                    openModal={handleOpenModal}
                />
            </nav>
            {folders !== undefined ? (
                <Tree rootFolder={folders} openModal={handleOpenModal} />
            ) : (
                <Loader />
            )}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <h1 className="text-2xl font-bold">
                                    {t('folders.modal.title')}
                                </h1>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-lg">
                                    {t('folders.modal.description')}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <button
                                    className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                                    onClick={onClose}
                                >
                                    {t('folders.modal.cancel')}
                                </button>
                                <button
                                    className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                                    onClick={onClose}
                                >
                                    {t('folders.modal.confirm')}
                                </button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default Folders;
