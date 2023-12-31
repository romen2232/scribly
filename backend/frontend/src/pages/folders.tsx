import { SearchBar } from '../components/SearchBar';
import { Header } from '../components/Header';
import { useEffect } from 'react';
import { rootFolder, createFolder } from '../services/folders';
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
import { searchFolders } from '../utils/functions';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';

interface IFolderProps {}

const Folders: React.FunctionComponent<IFolderProps> = () => {
    const cookies = parseCookies();
    const [folders, setFolders] = useState<Folder>();
    const { t } = useTranslation();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [searchQuery, setSearchQuery] = useState('' as string);
    const [filteredFolders, setFilteredFolders] = useState<Folder | null>();
    const [showFavorites, setShowFavorites] = useState(false);

    const [folderName, setFolderName] = useState('');
    const [folderDescription, setFolderDescription] = useState('');
    const [newFolderParentId, setNewFolderParentId] = useState(-1);

    useEffect(() => {
        updateRootFolder();
    }, []);

    useEffect(() => {
        if (folders) {
            const newFolder = searchFolders(
                folders,
                searchQuery,
                showFavorites,
            );

            setFilteredFolders(newFolder as Folder | null);
        }
    }, [searchQuery, folders, showFavorites]);

    const handleOpenModal = (parentFolderId: number) => {
        setNewFolderParentId(parentFolderId);
        onOpen();
    };

    const handleCreateFolder = (
        folName: string,
        folDesc: string,
        folParent: number,
    ) => {
        createFolder(
            {
                folderName: folName,
                folderDescription: folDesc,
                folderParent: folParent,
            },
            cookies[AUTH_COOKIE_NAME],
        )
            .then(() => {
                toast.success(t('folders.toast.success'));
                updateRootFolder();
            })
            .catch((error) => {
                toast.error(t(error.message));
            });
    };

    const updateRootFolder = () => {
        rootFolder(cookies[AUTH_COOKIE_NAME])
            .then((response) => {
                setFolders(response);
            })
            .catch((error) => {
                toast.error(t(error.message));
            });
    };
    return (
        <>
            <Header />
            <h1 className="flex w-full justify-center py-10 text-4xl font-extrabold ">
                {t('folders.Title')}
            </h1>
            <nav className="flex w-full items-center px-12">
                <SearchBar
                    onChange={(e) => setSearchQuery(e.target.value)}
                    setShowFavorites={setShowFavorites}
                    showFavorites={showFavorites}
                />

                <Add
                    parentFolderId={folders?.id ?? -1}
                    openModal={handleOpenModal}
                />
            </nav>
            {searchQuery || showFavorites ? (
                filteredFolders ? (
                    <Tree
                        rootFolder={filteredFolders}
                        openModal={handleOpenModal}
                        updateRoot={updateRootFolder}
                    />
                ) : (
                    <p className="w-full pt-24 text-center text-3xl font-bold">
                        {/* TODO: Typewriter effect maybe? */}
                        {t('folders.NoFolders')}
                    </p>
                )
            ) : folders ? (
                <Tree
                    rootFolder={folders}
                    openModal={handleOpenModal}
                    updateRoot={updateRootFolder}
                />
            ) : (
                <Loader />
            )}

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className="bg-mainBackground-200"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <h1 className="text-2xl font-bold">
                                    {t('folders.Modal.Title')}
                                </h1>
                            </ModalHeader>
                            <ModalBody>
                                <InputField
                                    label={t('folders.Name')}
                                    inputType="text"
                                    name={t('folder.Name')}
                                    placeholder={t('folders.Name')}
                                    required
                                    value={folderName}
                                    onChange={(e) =>
                                        setFolderName(e.target.value)
                                    }
                                />
                                <InputField
                                    label={t('folders.Description')}
                                    inputType="text"
                                    name={t('folder.Description')}
                                    placeholder={t('folders.Description')}
                                    required
                                    value={folderDescription}
                                    onChange={(e) =>
                                        setFolderDescription(e.target.value)
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className="w-full rounded-lg bg-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-600 sm:w-auto"
                                    bgColor="gray-200"
                                    onClick={() => {
                                        onClose();
                                    }}
                                >
                                    {t('folders.modal.cancel')}
                                </Button>
                                <Button
                                    className="w-full rounded-lg bg-primaryBlue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primaryBlue-800 focus:outline-none focus:ring-4 focus:ring-primaryBlue-300 sm:w-auto"
                                    bgColor="primaryBlue-700"
                                    onClick={() => {
                                        if (
                                            folderName === '' ||
                                            folderDescription === ''
                                        )
                                            return;

                                        handleCreateFolder(
                                            folderName,
                                            folderDescription,
                                            newFolderParentId,
                                        );
                                        onClose();
                                    }}
                                >
                                    {t('folders.modal.create')}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default Folders;
