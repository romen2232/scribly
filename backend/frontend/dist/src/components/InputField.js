import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const InputField = ({ label, inputType, ...props }) => {
    let labelComponent = null;
    if (label) {
        labelComponent = (_jsx("label", { className: "sr-only ", htmlFor: props.name, children: label }));
    }
    const finalClasses = [
        'relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-secondaryYellow-800 focus:outline-none focus:ring-secondaryYellow-800 sm:text-sm bg-mainBackground-100 focus:bg-mainBackground-50',
        props.className,
    ];
    return (_jsxs("div", { className: "mb-4 flex w-full flex-col ", children: [labelComponent, _jsx("input", { className: finalClasses.join(' '), type: inputType, name: props.name, ...props })] }));
};
