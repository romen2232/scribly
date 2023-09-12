import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function ProgressBar(props) {
    return (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-full ", children: _jsx("div", { className: "flex h-4  overflow-hidden rounded-xl bg-gray-200 text-xs", children: _jsx("div", { style: {
                            width: `${(props.progressValue / props.progressMax) * 100}%`,
                        }, className: `text-white bg-${props.progressColor}-100 whitespace-nowrap rounded-xl shadow-none`, children: _jsx("div", { className: " flex h-2 justify-center overflow-hidden rounded-xl pt-1 text-xs", children: _jsx("div", { className: ` flex w-9/12 flex-col justify-center whitespace-nowrap rounded-xl bg-${props.progressColor}-50 text-center text-white shadow-none` }) }) }) }) }), _jsx("div", { className: "flex flex-row justify-between pl-4", children: _jsxs("p", { className: "text-xs font-bold text-gray-400", children: [props.progressValue, "/", props.progressMax] }) })] }));
}
