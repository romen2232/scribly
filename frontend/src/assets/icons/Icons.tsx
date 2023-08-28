import {
    FaFeatherAlt,
    FaFolder,
    FaFolderOpen,
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
import { BsFileEarmarkText } from 'react-icons/bs';
import { IconBaseProps } from 'react-icons/lib';
import { JSX } from 'react/jsx-runtime';

export const FolderIcon = (props: JSX.IntrinsicAttributes & IconBaseProps) => {
    return <FaFolder {...props} />;
};

export const FolderOpenIcon = (
    props: JSX.IntrinsicAttributes & IconBaseProps,
) => {
    return <FaFolderOpen {...props} />;
};

export const FileIcon = (props: JSX.IntrinsicAttributes & IconBaseProps) => {
    return <BsFileEarmarkText {...props} />;
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
