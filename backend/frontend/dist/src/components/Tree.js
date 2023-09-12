import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TreeItem } from './TreeItem';
export function Tree({ rootFolder, openModal, changeFolder, updateRoot, onlyFolders, }) {
    return (_jsxs("div", { className: "ml- flex w-full flex-col px-12 text-xl", children: [rootFolder?.subfolders?.map((folder) => {
                return (_jsx(TreeItem, { folder: true, index: 0, data: folder, name: folder.folderName, description: folder.folderDescription, favorite: folder.favorite, onlyFolders: onlyFolders, changeFolder: changeFolder, openModal: openModal, updateRoot: updateRoot }, folder.id));
            }), onlyFolders
                ? null
                : rootFolder?.notes?.map((note) => {
                    return (_jsx(TreeItem, { folder: false, index: 0, data: note, name: note.noteName, favorite: note.favorite, updateRoot: updateRoot, changeFolder: changeFolder }, note.id));
                })] }));
}
