import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaFeatherAlt, FaFolder, FaFolderOpen, FaFolderPlus, FaUsers, FaUser, } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { IoIosAddCircle, IoIosArrowRoundBack } from 'react-icons/io';
import { MdOutlinePlayLesson } from 'react-icons/md';
import { AiFillStar, AiOutlineStar, AiOutlineRight, AiFillFlag, AiFillSetting, } from 'react-icons/ai';
import { RiUserFollowLine, RiUserUnfollowLine, RiQuillPenLine } from 'react-icons/ri';
import { BsFileEarmarkText, BsFillFileEarmarkPlusFill, BsGem, } from 'react-icons/bs';
import { PiAlienThin, PiFilmScriptLight } from 'react-icons/pi';
import { GiQuillInk } from 'react-icons/gi';
import '../styles/paperPlane.css';
export const FolderIcon = (props) => {
    return _jsx(FaFolder, { ...props });
};
export const AddFolderIcon = (props) => {
    return _jsx(FaFolderPlus, { ...props });
};
export const FolderOpenIcon = (props) => {
    return _jsx(FaFolderOpen, { ...props });
};
export const FileIcon = (props) => {
    return _jsx(BsFileEarmarkText, { ...props });
};
export const AddFileIcon = (props) => {
    return _jsx(BsFillFileEarmarkPlusFill, { ...props });
};
export const StarIcon = (props) => {
    return _jsx(AiFillStar, { ...props });
};
export const StarOutlineIcon = (props) => {
    return _jsx(AiOutlineStar, { ...props });
};
export const AddIcon = (props) => {
    return _jsx(IoIosAddCircle, { ...props });
};
export const CategoryIcon = (props) => {
    return _jsx(FaFeatherAlt, { ...props });
};
export const BackIcon = (props) => {
    return _jsx(IoIosArrowRoundBack, { ...props });
};
export const CommunityIcon = (props) => {
    return _jsx(FaUsers, { ...props });
};
export const ProfileIcon = (props) => {
    return _jsx(FaUser, { ...props });
};
export const KnowledgeIcon = (props) => {
    return _jsx(RiQuillPenLine, { ...props });
};
export const LessonPlayIcon = (props) => {
    return _jsx(MdOutlinePlayLesson, { ...props });
};
export const RightIcon = (props) => {
    return _jsx(AiOutlineRight, { ...props });
};
export const FlagIcon = (props) => {
    return _jsx(AiFillFlag, { ...props });
};
export const SettingIcon = (props) => {
    return _jsx(AiFillSetting, { ...props });
};
export const PoetryIcon = (props) => {
    return _jsx(GiQuillInk, { ...props });
};
export const ProseIcon = (props) => {
    return _jsx(PiAlienThin, { ...props });
};
export const ScriptIcon = (props) => {
    return _jsx(PiFilmScriptLight, { ...props });
};
export const GemIcon = (props) => {
    return _jsx(BsGem, { ...props });
};
export const FollowIcon = (props) => {
    return _jsx(RiUserFollowLine, { ...props });
};
export const UnfollowIcon = (props) => {
    return _jsx(RiUserUnfollowLine, { ...props });
};
export const LogoutIcon = (props) => {
    return _jsx(FiLogOut, { ...props });
};
export const WavyFooter = () => {
    return (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1440 320", children: _jsx("path", { d: "M0,160L48,154.7C96,149,192,139,288,165.3C384,192,480,256,576,272C672,288,768,256,864,208C960,160,1056,96,1152,74.7C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }) }));
};
export const Triangle = ({ width = '143.000000pt', height = '230.000000pt', className = '', }) => {
    return (_jsx("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: width, height: height, viewBox: "0 0 143 230", className: className, xmlSpace: "preserve", children: _jsxs("g", { id: "Capa_1", children: [_jsx("g", { transform: "translate(0.000000,230.000000) scale(0.100000,-0.100000)", children: _jsx("path", { d: "M498.3,2232.9c-12.5-23.9-0.5-2060.7,13-2107.2c14.2-50.5,39-64.9,122.9-69.9c127.3-7,382.3-4.5,402.4,4.2\n\t\t\tc33,14.3,31,66.8-9.2,320.8c-93.8,596.9-205.9,1120.4-338.4,1592.6c-53.9,192.4-84.4,263.1-120.7,279\n\t\t\tC537.3,2266.1,513.2,2258.9,498.3,2232.9z M639,1796.9c8.2-6.3,327.8-1613.5,323.2-1625.4c-3.6-9.2-324-19.3-328-10.1\n\t\t\tc-10.3,23.9-25,1631.3-14.9,1635.6C625.8,1799.9,634.7,1799.4,639,1796.9z" }) }), _jsx("path", { className: "st0", d: "M62,29.5" }), _jsx("path", { className: "st1", d: "M-204.2,40.3c-0.1,0-0.1,0-0.2,0" })] }) }));
};
//https://codepen.io/_ItsJonQ/pen/jOVwoJ
export const PaperPlane = () => {
    return (_jsxs("div", { className: "allRelative h-full w-full overflow-hidden  bg-sky-200", children: [_jsx("div", { className: "frame", children: _jsx("div", { className: "plane-container", children: _jsx("a", { href: "http://customer.io/", target: "_blank", rel: "noreferrer", children: _jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "1131.53px", height: "379.304px", viewBox: "0 0 1131.53 379.304", enableBackground: "new 0 0 1131.53 379.304", xmlSpace: "preserve", className: "plane", children: [_jsx("polygon", { fill: "#D8D8D8", points: "72.008,0 274.113,140.173 274.113,301.804 390.796,221.102 601.682,367.302 1131.53,0.223  " }), _jsx("polygon", { fill: "#C4C4C3", points: "1131.53,0.223 274.113,140.173 274.113,301.804 390.796,221.102   " })] }) }) }) }), _jsxs("div", { className: "clouds", children: [_jsx("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "762px", height: "331px", viewBox: "0 0 762 331", enableBackground: "new 0 0 762 331", xmlSpace: "preserve", className: "cloud big front slowest", children: _jsx("path", { fill: "#FFFFFF", d: "M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106\nc-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529\nC245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5\nS20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z" }) }), _jsx("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "762px", height: "331px", viewBox: "0 0 762 331", enableBackground: "new 0 0 762 331", xmlSpace: "preserve", className: "cloud distant smaller", children: _jsx("path", { fill: "#FFFFFF", d: "M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106\nc-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529\nC245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5\nS20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z" }) }), _jsx("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "762px", height: "331px", viewBox: "0 0 762 331", enableBackground: "new 0 0 762 331", xmlSpace: "preserve", className: "cloud small slow", children: _jsx("path", { fill: "#FFFFFF", d: "M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106\nc-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529\nC245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5\nS20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z" }) }), _jsx("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "762px", height: "331px", viewBox: "0 0 762 331", enableBackground: "new 0 0 762 331", xmlSpace: "preserve", className: "cloud distant super-slow massive", children: _jsx("path", { fill: "#FFFFFF", d: "M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106\nc-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529\nC245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5\nS20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z" }) }), _jsx("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "762px", height: "331px", viewBox: "0 0 762 331", enableBackground: "new 0 0 762 331", xmlSpace: "preserve", className: "cloud slower", children: _jsx("path", { fill: "#FFFFFF", d: "M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106\nc-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529\nC245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5\nS20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z" }) })] })] }));
};
