import { FaFolder } from 'react-icons/fa';
import { BsFileEarmarkText } from 'react-icons/bs';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import useHover from '../hooks/useHover';
import { Link } from 'react-router-dom';

export interface ITreeItem {
    folder: boolean;
    name?: string;
    description?: string;
    index: number;
    children?: ITreeItem[];
    favorite?: boolean;
    isOpen?: boolean;
}

export function TreeItem(props: ITreeItem) {
    const folder = props.folder;
    const { ref: hoverRef, isHovered: isHovered } = useHover();
    const { ref: hoverRefStar, isHovered: isHoveredStar } = useHover();

    const name = 'Folder';
    const description = 'Lorem ipsum dolor sit,...';

    const mlIndex = [
        'ml-0',
        'ml-16',
        'ml-32',
        'ml-48',
        'ml-64',
        'ml-80',
        'ml-96',
    ];

    return (
        <>
            <div className="w-full px-4 pb-3">
                <div
                    ref={hoverRef}
                    className={`hover:bg-hover:shadow flex cursor-pointer items-center  justify-between rounded-md p-3 transition duration-300 ease-in-out hover:bg-tiviElectricPurple-50 hover:shadow-lg ${
                        mlIndex[props.index]
                    }`}
                >
                    <div className="flex items-center">
                        {folder ? (
                            props.isOpen ? (
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
                        {isHovered && props.folder && (
                            <Link to="/new">
                                <IoIosAddCircleOutline className="h-7 w-7 hover:h-10 hover:w-10 hover:translate-x-1.5" />
                            </Link>
                        )}
                        <div ref={hoverRefStar}>
                            {
                                //If its hovered and it is not a favorite or is a favorite, then show the filled star
                                //If its not hovered and it is a favorite or is not a favorite, then show the filled star
                                !isHoveredStar === props.favorite ||
                                isHoveredStar === !props.favorite ? (
                                    <AiFillStar className="h-7 w-7" />
                                ) : (
                                    <AiOutlineStar className="h-7 w-7" />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
