import { Folder, Note } from "../utils/types"
import { TreeItem } from "./TreeItem"

export interface ITreeProps {
    rootFolder?: Folder
}
export function Tree({rootFolder}: ITreeProps){

    return (
        <div className="ml- flex w-full flex-col px-12 text-xl">
                {rootFolder?.subfolders?.map((folder: Folder) => {
                    return <TreeItem folder={true} key={folder.id} index={0} data={folder} name={folder.folderName} description={folder.folderDescription}/>
                })}
                {rootFolder?.notes?.map((note: Note) => {
                    return <TreeItem folder={false} key={note.id} index={0} data={note} name={note.noteName}
                    />
                })
                }

            </div>
    )
}

