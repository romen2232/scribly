import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
const WavyHeader = ({ children, color, className }) => {
    const [desktop, setDesktop] = useState(window.innerWidth > 1024);
    const bgColor = () => {
        switch (color) {
            case 'pink':
                return 'fill-primaryPink-500';
            case 'yellow':
                return 'fill-secondaryYellow-500';
            default:
                return 'fill-primaryBlue-500';
        }
    };
    const fullClassName = desktop
        ? [
            'absolute bottom-0 right-0 h-20 w-full overflow-hidden lg:bottom-auto lg:left-0 lg:top-0 lg:h-full lg:w-1/5',
            bgColor(),
            className,
        ]
        : [
            ' absolute left-0 top-0 h-20 w-full overflow-hidden lg:bottom-auto lg:left-0 lg:top-0 lg:h-full lg:w-1/5',
            bgColor(),
            className,
        ];
    const updateMedia = () => {
        setDesktop(window.innerWidth >= 1024);
    };
    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    });
    return (_jsx(_Fragment, { children: desktop ? (_jsxs("aside", { className: fullClassName.join(' '), children: [_jsx("svg", { id: "Modo_de_aislamiento", "data-name": "Modo de aislamiento", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 151.32 500", width: "100%", preserveAspectRatio: "none", height: "100%", className: "-z-10", children: _jsx("path", { d: "M645.51,387c-73.56,192.65,18,347,0,500H496.59V387Z", transform: "translate(-496.59 -386.99)" }) }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center", children: children })] })) : (_jsxs("header", { className: fullClassName.join(' '), children: [_jsx("svg", { id: "Capa_1", "data-name": "Capa 1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 500 150", width: '100%', preserveAspectRatio: "none", height: '100%', className: "-z-10 overflow-hidden", children: _jsx("path", { d: "M879.45,889.57c-170.71-131.19-336,52.69-500-14V740.65h500Z", transform: "translate(-379.45 -740.65)" }) }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center", style: { clipPath: 'url(#wavyClip)' }, children: children })] })) }));
};
export default WavyHeader;
