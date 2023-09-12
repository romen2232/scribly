import { jsx as _jsx } from "react/jsx-runtime";
export const PageContainer = ({ children }) => {
    return (_jsx("div", { className: "mx-auto flex h-full max-w-3xl flex-col  items-center justify-center px-4 duration-300 transition-opacity sm:px-6 md:px-8", children: children }));
};
