import { AddFolderIcon, AddFileIcon } from '../assets/icons/Icons';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

export interface IAdd {
    parentFolderId: number;
    openModal?: (parentFolderId: number) => void;
}

export default function Add({ parentFolderId, openModal }: IAdd) {
    const classNameProps = 'mr-5 h-8 w-8 hover:cursor-pointer';
    const navigate = useNavigate();
    const { t } = useTranslation();

    const newFolder = (e: React.MouseEvent, parentFolderId: number) => {
        e.stopPropagation();
        openModal?.(parentFolderId);
    };

    const newFile = (e: React.MouseEvent, parentFolderId: number) => {
        e.stopPropagation();
        navigate(t(`/note`) + `?` + t('folderId') + `=${parentFolderId}`);
    };

    return (
        <div className="flex ">
            <AddFileIcon
                className={classNameProps}
                onClick={(e) => newFile(e, parentFolderId)}
            />
            <AddFolderIcon
                className={classNameProps}
                onClick={(e) => newFolder(e, parentFolderId)}
            />
        </div>
    );
}
