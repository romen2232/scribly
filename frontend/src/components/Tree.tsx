import { Folder, Note } from '../utils/types';
import { TreeItem } from './TreeItem';

export interface ITreeProps {
    rootFolder?: Folder;
    onlyFolders?: boolean;
    openModal?: (parentFolderId: number) => void;
    changeFolder?: (folder: Folder) => void;
    updateRoot?: () => void;
}
export function Tree({
    rootFolder,
    openModal,
    changeFolder,
    updateRoot,
    onlyFolders,
}: ITreeProps) {
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
                        onlyFolders={onlyFolders}
                        changeFolder={changeFolder}
                        openModal={openModal}
                        updateRoot={updateRoot}
                    />
                );
            })}
            {onlyFolders
                ? null
                : rootFolder?.notes?.map((note: Note) => {
                      return (
                          <TreeItem
                              folder={false}
                              key={note.id}
                              index={0}
                              data={note}
                              name={note.noteName}
                              favorite={note.favorite}
                              updateRoot={updateRoot}
                              changeFolder={changeFolder}
                          />
                      );
                  })}
        </div>
    );
}
