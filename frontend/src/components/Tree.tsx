import { Folder, Note } from '../utils/types';
import { TreeItem } from './TreeItem';

export interface ITreeProps {
    rootFolder?: Folder;
    openModal?: (parentFolderId: number) => void;
}
export function Tree({ rootFolder, openModal }: ITreeProps) {
    return (
        <div className="ml- flex w-full flex-col px-12 text-xl">
            {rootFolder?.subfolders?.map((folder: Folder) => {
                return (
                    <TreeItem
                        folder={true}
                        key={folder.id}
                        index={0}
                        data={folder}
                        name={folder.folderName}
                        description={folder.folderDescription}
                        favorite={folder.favorite}
                        openModal={openModal}
                    />
                );
            })}
            {rootFolder?.notes?.map((note: Note) => {
                return (
                    <TreeItem
                        folder={false}
                        key={note.id}
                        index={0}
                        data={note}
                        name={note.noteName}
                        favorite={note.favorite}
                    />
                );
            })}
        </div>
    );
}
