import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from '../components/Header';
import '../assets/styles/notFound.css';
const PageNotFound = () => {
    return (_jsxs("div", { id: "notFound", children: [_jsx(Header, {}), _jsx("main", { id: "main", children: _jsx("div", { className: "fof", children: _jsx("h1", { children: "Error 404" }) }) })] }));
};
export default PageNotFound;
