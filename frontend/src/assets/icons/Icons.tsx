import {
    FaFeatherAlt,
    FaFolder,
    FaFolderOpen,
    FaFolderPlus,
    FaUsers,
    FaUser,
} from 'react-icons/fa';
import { IoIosAddCircle, IoIosArrowRoundBack } from 'react-icons/io';
import { SiKnowledgebase } from 'react-icons/si';
import { MdOutlinePlayLesson } from 'react-icons/md';
import {
    AiFillStar,
    AiOutlineStar,
    AiOutlineRight,
    AiFillFlag,
    AiFillSetting,
} from 'react-icons/ai';
import { BsFileEarmarkText, BsFillFileEarmarkPlusFill } from 'react-icons/bs';
import { IconBaseProps } from 'react-icons/lib';
import { JSX } from 'react/jsx-runtime';

export const FolderIcon = (props: JSX.IntrinsicAttributes & IconBaseProps) => {
    return <FaFolder {...props} />;
};

export const AddFolderIcon = (
    props: JSX.IntrinsicAttributes & IconBaseProps,
) => {
    return <FaFolderPlus {...props} />;
};

export const FolderOpenIcon = (
    props: JSX.IntrinsicAttributes & IconBaseProps,
) => {
    return <FaFolderOpen {...props} />;
};

export const FileIcon = (props: JSX.IntrinsicAttributes & IconBaseProps) => {
    return <BsFileEarmarkText {...props} />;
};

export const AddFileIcon = (props: JSX.IntrinsicAttributes & IconBaseProps) => {
    return <BsFillFileEarmarkPlusFill {...props} />;
};

export const StarIcon = (props: JSX.IntrinsicAttributes & IconBaseProps) => {
    return <AiFillStar {...props} />;
};

export const StarOutlineIcon = (
    props: JSX.IntrinsicAttributes & IconBaseProps,
) => {
    return <AiOutlineStar {...props} />;
};

export const AddIcon = (props: JSX.IntrinsicAttributes & IconBaseProps) => {
    return <IoIosAddCircle {...props} />;
};

export const CategoryIcon = (
    props: JSX.IntrinsicAttributes & IconBaseProps,
) => {
    return <FaFeatherAlt {...props} />;
};

export const BackIcon = (props: JSX.IntrinsicAttributes & IconBaseProps) => {
    return <IoIosArrowRoundBack {...props} />;
};

export const CommunityIcon = (
    props: JSX.IntrinsicAttributes & IconBaseProps,
) => {
    return <FaUsers {...props} />;
};

export const ProfileIcon = (props: JSX.IntrinsicAttributes & IconBaseProps) => {
    return <FaUser {...props} />;
};

export const KnowledgeIcon = (
    props: JSX.IntrinsicAttributes & IconBaseProps,
) => {
    return <SiKnowledgebase {...props} />;
};

export const LessonPlayIcon = (
    props: JSX.IntrinsicAttributes & IconBaseProps,
) => {
    return <MdOutlinePlayLesson {...props} />;
};

export const RightIcon = (props: JSX.IntrinsicAttributes & IconBaseProps) => {
    return <AiOutlineRight {...props} />;
};

export const FlagIcon = (props: JSX.IntrinsicAttributes & IconBaseProps) => {
    return <AiFillFlag {...props} />;
};

export const SettingIcon = (props: JSX.IntrinsicAttributes & IconBaseProps) => {
    return <AiFillSetting {...props} />;
};

export const WavyFooter = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path d="M0,160L48,154.7C96,149,192,139,288,165.3C384,192,480,256,576,272C672,288,768,256,864,208C960,160,1056,96,1152,74.7C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
    );
};

export const Triangle = ({
    width = '143.000000pt',
    height = '230.000000pt',
    className = '',
}) => {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={width}
            height={height}
            viewBox="0 0 143 230"
            className={className}
            xmlSpace="preserve"
        >
            <g id="Capa_1">
                <g transform="translate(0.000000,230.000000) scale(0.100000,-0.100000)">
                    <path
                        d="M498.3,2232.9c-12.5-23.9-0.5-2060.7,13-2107.2c14.2-50.5,39-64.9,122.9-69.9c127.3-7,382.3-4.5,402.4,4.2
			c33,14.3,31,66.8-9.2,320.8c-93.8,596.9-205.9,1120.4-338.4,1592.6c-53.9,192.4-84.4,263.1-120.7,279
			C537.3,2266.1,513.2,2258.9,498.3,2232.9z M639,1796.9c8.2-6.3,327.8-1613.5,323.2-1625.4c-3.6-9.2-324-19.3-328-10.1
			c-10.3,23.9-25,1631.3-14.9,1635.6C625.8,1799.9,634.7,1799.4,639,1796.9z"
                    />
                </g>
                <path className="st0" d="M62,29.5" />
                <path className="st1" d="M-204.2,40.3c-0.1,0-0.1,0-0.2,0" />
            </g>
        </svg>
    );
};
