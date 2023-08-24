import { FaFolder } from 'react-icons/fa';
import { BsFileEarmarkText } from 'react-icons/bs';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import useHover from '../hooks/useHover';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Folder, Note } from '../utils/types';

export interface ITreeItem {
    folder?: boolean;
    name?: string;
    description?: string;
    index: number;
    favorite?: boolean;
    // TODO: This any is ugly, it only can be rather a Folder or a Note
    data: any;
}

//TODO: Implement logic of favorite
//TODO: Drag elemnts to reorder

export function TreeItem({folder, name, description, index, favorite, data}: ITreeItem) {
    const { ref: hoverRef, isHovered: isHovered } = useHover();
    const { ref: hoverRefStar, isHovered: isHoveredStar } = useHover();

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    const mlIndex = [
        'ml-0',
        'ml-16',
        'ml-32',
        'ml-48',
    ];

    return (
        <>
            <div className="w-full px-4 pb-3">
                <div
                    ref={hoverRef}
                    onClick={toggleOpen}
                    className={`hover:bg-hover:shadow flex cursor-pointer items-center  justify-between rounded-md p-3 transition duration-300 ease-in-out hover:bg-tiviElectricPurple-50 hover:shadow-lg ${
                        mlIndex[index]
                    }`}
                >
                    <div className="flex items-center">
                        {folder ? (
                            isOpen ? (
                                <FaFolder className="h-8 w-8" />
                            ) : (
                                <FaFolder className="h-8 w-8" />
                            )
                        ) : (
                            <BsFileEarmarkText className="h-8 w-8" />
                        )}
                        <div className="px-3">
                            <h4 className="font-bold">{name}</h4>
                            <p className="text-xs">{description}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        {isHovered && folder && (
                            // TODO: Add onClick to create new folder
                            <Link to="/new">
                                <IoIosAddCircleOutline className="h-7 w-7 hover:h-10 hover:w-10 hover:translate-x-1.5" />
                            </Link>
                        )}
                        <div ref={hoverRefStar}>
                            {
                                //If its hovered and it is not a favorite or is a favorite, then show the filled star
                                //If its not hovered and it is a favorite or is not a favorite, then show the filled star
                                !isHoveredStar === favorite ||
                                isHoveredStar === !favorite ? (
                                    <AiFillStar className="h-7 w-7" />
                                ) : (
                                    <AiOutlineStar className="h-7 w-7" />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <>
                        {data.subfolders.map((item: Folder) => (
                            <TreeItem
                                key={item.id}
                                folder={true}
                                name={item.folderName}
                                description={item.folderDescription}
                                index={index + 1}
                                data={item}
                            />
                        ))}
                    {data.notes.map((item: Note) => (
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
