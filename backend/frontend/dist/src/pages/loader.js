import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import '../assets/styles/loader.css';
// https://codepen.io/borntofrappe/pen/yxExMw
const Loader = ({ text }) => {
    const { t } = useTranslation();
    return (_jsx("div", { className: "flex h-full w-full items-center justify-center", children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "moon shrink-0", children: [_jsx("div", { className: "eye left" }), _jsx("div", { className: "eye right" }), _jsx("div", { className: "mouth" })] }), _jsx("p", { className: "m-0 max-w-xs", children: text || t('Loading') })] }) }));
};
export default Loader;
