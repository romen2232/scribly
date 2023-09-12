import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FileIcon, FolderIcon, FolderOpenIcon, StarIcon, StarOutlineIcon, } from '../assets/icons/Icons';
import useHover from '../hooks/useHover';
import { useState } from 'react';
import Add from './Add';
import { partialUpdateFolder } from '../services/folders';
import { partialUpdateNote } from '../services/notes';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//TODO: Drag elemnts to reorder
export function TreeItem({ folder, name, description, index, favorite, data, onlyFolders, openModal, updateRoot, changeFolder, }) {
    const { ref: hoverRef, isHovered: isHovered } = useHover();
    const [isFavorite, setIsFavorite] = useState(favorite);
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(onlyFolders ?? false);
    const cookies = parseCookies();
    const mlIndex = ['ml-0', 'ml-16', 'ml-32', 'ml-48'];
    const handleItemClick = () => {
        if (onlyFolders) {
            changeFolder && changeFolder(data);
            return;
        }
        setIsOpen(!isOpen);
    };
    const handleFavorite = (e) => {
        e.stopPropagation();
        // The stopPropagation() method prevents propagation of the same event from being called.
        // Propagation means bubbling up to parent elements or capturing down to child elements.
        // Whereas The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
        e.preventDefault();
        if (folder) {
            partialUpdateFolder(data.id, {
                favorite: !isFavorite,
            }, cookies[AUTH_COOKIE_NAME]).then(() => {
                setIsFavorite(!isFavorite);
                updateRoot && updateRoot();
            });
        }
        else {
            partialUpdateNote(data.id, {
                favorite: !isFavorite,
            }, cookies[AUTH_COOKIE_NAME]).then(() => {
                setIsFavorite(!isFavorite);
                updateRoot && updateRoot();
            });
        }
    };
    const ConditionalLink = ({ children }) => {
        if (!folder && 'folder' in data) {
            return (_jsx(Link, { to: t('/note') +
                    '?' +
                    t('noteId') +
                    '=' +
                    data.id +
                    '&' +
                    t('folderId') +
                    '=' +
                    data.folder, className: "flex items-center justify-between", children: children }));
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
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-full px-4 pb-3", children: _jsx(ConditionalLink, { children: _jsxs("div", { ref: hoverRef, onClick: handleItemClick, className: `hover:bg-hover:shadow flex w-full cursor-pointer items-center justify-between rounded-md p-3 duration-300 ease-in-out transition ${folder
                            ? 'hover:bg-primaryPink-100'
                            : 'hover:bg-primaryBlue-100'} hover:shadow-lg ${mlIndex[index]}`, children: [_jsxs("div", { className: "flex items-center", children: [folder ? (isOpen ? (_jsx(FolderOpenIcon, { className: "h-8 w-8" })) : (_jsx(FolderIcon, { className: "h-8 w-8" }))) : (_jsx(FileIcon, { className: "h-8 w-8" })), _jsxs("div", { className: "px-3", children: [_jsx("h4", { className: "font-bold", children: name }), _jsx("p", { className: "text-xs", children: description })] })] }), _jsxs("div", { className: "flex items-center gap-10", children: [!onlyFolders &&
                                        isHovered &&
                                        folder &&
                                        'depth' in data &&
                                        data.depth &&
                                        data.depth <= 5 && (_jsx(Add, { parentFolderId: data.id, openModal: openModal })), _jsx("div", { children: !onlyFolders &&
                                            (isFavorite ? (_jsx(StarIcon, { className: "h-7 w-7", onClick: handleFavorite })) : (_jsx(StarOutlineIcon, { className: "h-7 w-7", onClick: handleFavorite }))) })] })] }) }) }), isOpen && 'subfolders' in data && (_jsx(_Fragment, { children: data.subfolders?.map((item) => (_jsx(TreeItem, { folder: true, name: item.folderName, description: item.folderDescription, index: index + 1, data: item, onlyFolders: onlyFolders, changeFolder: changeFolder, openModal: openModal }, item.id))) })), isOpen && !onlyFolders && 'notes' in data && (_jsx(_Fragment, { children: data.notes?.map((item) => (_jsx(TreeItem, { folder: false, name: item.noteName, index: index + 1, data: item }, item.id))) }))] }));
}
