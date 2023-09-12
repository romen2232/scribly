import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Scribly = ({ className }) => {
    const finalClassName = ['flex justify-center font-casualHandy', className];
    return (_jsx("div", { className: "w-full text-9xl", children: _jsxs("h1", { className: finalClassName.join(' '), children: ["Scribly", _jsx("div", { className: "ml-0.5 w-fit rotate-6", children: "!" })] }) }));
};
export default Scribly;
