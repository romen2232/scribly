import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
export default function Rating(props) {
    const [rating, setRating] = useState(props.rating);
    const [hover, setHover] = useState(0);
    const { t } = useTranslation();
    const processRating = (rating) => {
        setRating(rating);
        props.handleRating(rating);
    };
    return (_jsx(_Fragment, { children: _jsx("div", { className: "flex flex-col items-center gap-2", children: _jsx("span", { className: "flex items-center gap-4 rounded text-xs text-slate-500", children: _jsx("span", { className: "flex gap-1 text-amber-400", role: "img", "aria-label": t('rating.AverageRating'), children: Array(5)
                        .fill('')
                        .map((_, i) => (_jsx("button", { type: "button", role: "button", name: "puntuaci\u00F3n media", className: "focus:outline-none", onClick: () => processRating(i + 1), onMouseEnter: () => setHover(i + 1), onMouseLeave: () => setHover(0), children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: i + 1 <= (hover || rating)
                                ? 'currentColor'
                                : 'none', stroke: "currentColor", className: "h-3.5 w-3.5", children: _jsx("path", { fillRule: "evenodd", d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z", clipRule: "evenodd" }) }) }, i))) }) }) }) }));
}
