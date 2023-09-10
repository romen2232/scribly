import {
    FileIcon,
    FolderIcon,
    FolderOpenIcon,
    StarIcon,
    StarOutlineIcon,
} from '../assets/icons/Icons';
import useHover from '../hooks/useHover';
import { ReactNode, useState } from 'react';
import { Folder, Note } from '../utils/types';
import Add from './Add';
import { partialUpdateFolder } from '../services/folders';
import { partialUpdateNote } from '../services/notes';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface ITreeItem {
    folder?: boolean;
    name?: string;
    description?: string;
    index: number;
    favorite?: boolean;
    data: Folder | Note;
    onlyFolders?: boolean;
    openModal?: (parentFolderId: number) => void;
    changeFolder?: (folder: Folder) => void;
    updateRoot?: () => void;
}

//TODO: Drag elemnts to reorder

export function TreeItem({
    folder,
    name,
    description,
    index,
    favorite,
    data,
    onlyFolders,
    openModal,
    updateRoot,
    changeFolder,
}: ITreeItem) {
    const { ref: hoverRef, isHovered: isHovered } = useHover();
    const [isFavorite, setIsFavorite] = useState(favorite);
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(onlyFolders ?? false);
    const cookies = parseCookies();

    const mlIndex = ['ml-0', 'ml-16', 'ml-32', 'ml-48'];

    const handleItemClick = () => {
        if (onlyFolders) {
            changeFolder && changeFolder(data as Folder);
            return;
        }
        setIsOpen(!isOpen);
    };
    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        // The stopPropagation() method prevents propagation of the same event from being called.
        // Propagation means bubbling up to parent elements or capturing down to child elements.
        // Whereas The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
        e.preventDefault();
        if (folder) {
            partialUpdateFolder(
                data.id as number,
                {
                    favorite: !isFavorite,
                },
                cookies[AUTH_COOKIE_NAME],
            ).then(() => {
                setIsFavorite(!isFavorite);
                updateRoot && updateRoot();
            });
        } else {
            partialUpdateNote(
                data.id as number,
                {
                    favorite: !isFavorite,
                },
                cookies[AUTH_COOKIE_NAME],
            ).then(() => {
                setIsFavorite(!isFavorite);
                updateRoot && updateRoot();
            });
        }
    };

    const ConditionalLink = ({ children }: { children: ReactNode }) => {
        if (!folder && 'folder' in data) {
            return (
                <Link
                    to={
                        t('/note') +
                        '?' +
                        t('noteId') +
                        '=' +
                        data.id +
                        '&' +
                        t('folderId') +
                        '=' +
                        data.folder
                    }
                    className="flex items-center justify-between"
                >
                    {children}
                </Link>
            );
        }
        return children;
    };

    if (onlyFolders && !folder) {
        return null;
    }

    //TODO: BIG TODO: this is a hacky way to fix the bug where the note is not deleted when it's empty, this should be fixed in the backend and in the frontend at Note
    if (!folder && 'noteName' in data && data.noteName === '') {
        return null;
    }

    return (
        <>
            <div className="w-full px-4 pb-3">
                <ConditionalLink>
                    <div
                        ref={hoverRef}
                        onClick={handleItemClick}
                        className={`hover:bg-hover:shadow flex w-full cursor-pointer items-center justify-between rounded-md p-3 duration-300 ease-in-out transition ${
                            folder
                                ? 'hover:bg-primaryPink-100'
                                : 'hover:bg-primaryBlue-100'
                        } hover:shadow-lg ${mlIndex[index]}`}
                    >
                        <div className="flex items-center">
                            {folder ? (
                                isOpen ? (
                                    <FolderOpenIcon className="h-8 w-8" />
                                ) : (
                                    <FolderIcon className="h-8 w-8" />
                                )
                            ) : (
                                <FileIcon className="h-8 w-8" />
                            )}
                            <div className="px-3">
                                <h4 className="font-bold">{name}</h4>
                                <p className="text-xs">{description}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-10">
                            {!onlyFolders &&
                                isHovered &&
                                folder &&
                                'depth' in data &&
                                data.depth &&
                                data.depth <= 5 && (
                                    <Add
                                        parentFolderId={data.id as number}
                                        openModal={openModal}
                                    />
                                )}

                            <div>
                                {!onlyFolders &&
                                    (isFavorite ? (
                                        <StarIcon
                                            className="h-7 w-7"
                                            onClick={handleFavorite}
                                        />
                                    ) : (
                                        <StarOutlineIcon
                                            className="h-7 w-7"
                                            onClick={handleFavorite}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </ConditionalLink>
            </div>
            {isOpen && 'subfolders' in data && (
                <>
                    {data.subfolders?.map((item: Folder) => (
                        <TreeItem
                            key={item.id}
                            folder={true}
                            name={item.folderName}
                            description={item.folderDescription}
                            index={index + 1}
                            data={item}
                            onlyFolders={onlyFolders}
                            changeFolder={changeFolder}
                            openModal={openModal}
                        />
                    ))}
                </>
            )}
            {isOpen && !onlyFolders && 'notes' in data && (
                <>
                    {data.notes?.map((item: Note) => (
                        <TreeItem
                            key={item.id}
                            folder={false}
                            name={item.noteName}
                            index={index + 1}
                            data={item}
                        />
                    ))}
                </>
            )}
        </>
    );
}
