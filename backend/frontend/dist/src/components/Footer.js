import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { CategoryIcon, AddIcon, FolderIcon } from '../assets/icons/Icons';
import { useTranslation } from 'react-i18next';
export function Footer(props) {
    const { t } = useTranslation();
    //Footer with smooth backdrop blur at the edge and fixed position
    return (_jsx("footer", { className: "fixed bottom-0 left-0 right-0 z-50 h-[6.5rem] w-full flex-shrink-0", children: _jsx("div", { className: "absolute h-full w-full", children: _jsxs("nav", { className: "footerMask relative z-10 flex h-full flex-row items-center justify-around", children: [_jsx("button", { onClick: props.onFooterModalClick, children: _jsx(CategoryIcon, { className: "h-12 w-12 duration-300 ease-in-out transition hover:text-tiviElectricViolet" }) }), _jsx(Link, { to: t('/note'), children: _jsx(AddIcon, { className: "h-12 w-12 duration-300 ease-in-out transition hover:text-tiviElectricViolet" }) }), _jsx(Link, { to: t('/folders'), children: _jsx(FolderIcon, { className: "h-12 w-12 duration-300 ease-in-out transition hover:text-tiviElectricViolet" }) })] }) }) }));
}
