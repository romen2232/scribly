import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AddFolderIcon, AddFileIcon } from '../assets/icons/Icons';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
export default function Add({ parentFolderId, openModal }) {
    const classNameProps = 'mr-5 h-8 w-8 hover:cursor-pointer';
    const navigate = useNavigate();
    const { t } = useTranslation();
    const newFolder = (e, parentFolderId) => {
        e.stopPropagation();
        openModal?.(parentFolderId);
    };
    const newFile = (e, parentFolderId) => {
        e.stopPropagation();
        navigate(t(`/note`) + `?` + t('folderId') + `=${parentFolderId}`);
    };
    return (_jsxs("div", { className: "flex ", children: [_jsx(AddFileIcon, { className: classNameProps, onClick: (e) => newFile(e, parentFolderId) }), _jsx(AddFolderIcon, { className: classNameProps, onClick: (e) => newFolder(e, parentFolderId) })] }));
}
