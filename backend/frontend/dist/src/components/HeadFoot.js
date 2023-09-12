import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../assets/styles/headFoot.css';
import WavyFooter from './WavyFooter';
import WavyHeader from './WavyHeader';
const HeadFoot = ({ children }) => {
    return (_jsxs("div", { className: "relative flex h-full flex-col items-center justify-center", children: [_jsx(WavyHeader, {}), children, _jsx(WavyFooter, {})] }));
};
export default HeadFoot;
