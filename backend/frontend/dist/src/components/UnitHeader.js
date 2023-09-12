import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { t } from 'i18next';
import { Link } from 'react-router-dom';
import { LessonPlayIcon } from '../assets/icons/Icons';
import { Button } from './Button';
import { determineLightColor, getColor } from '../utils/functions';
export function UnitHeader({ unitNumber, description, backgroundColor, }) {
    const hexColor = getColor(backgroundColor);
    const isLightColor = determineLightColor(hexColor);
    //TODO: determine a good way to do this
    const currentLesson = Math.floor(Math.random() * 75) + 1;
    return (_jsx(Button, { className: `w-full max-w-2xl rounded-xl px-3 py-1.5 ${isLightColor ? "text-black" : "text-white"}`, bgColor: backgroundColor, children: _jsxs("header", { className: "flex w-96 items-center justify-between p-4", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("h2", { className: "text-2xl font-bold", children: t('lessons.Unit') + ' ' + unitNumber }), _jsx("p", { className: "text-lg", children: description })] }), _jsx(Link, { to: t('/lesson' + '/' + currentLesson), className: "flex h-12 w-12 items-center justify-center rounded-full bg-white text-black", children: _jsx(LessonPlayIcon, { size: 32 }) })] }) }));
}
