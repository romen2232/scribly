import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { t } from 'i18next';
import { KnowledgeIcon } from '../assets/icons/Icons';
import { Button } from './Button';
import { Link } from 'react-router-dom';
//TODO: add animation of percentage completed
export function LessonIcon({ bgColor, lesson, extraClasses, disabled, }) {
    const finalClasses = ['flex flex-col items-center justify-center', extraClasses];
    if (disabled)
        finalClasses.push('opacity-50 cursor-not-allowed');
    //TODO: change icon and or add animation
    return (_jsxs("div", { className: finalClasses.join(' '), children: [_jsx(Button, { linkTo: t('/lesson') + '/' + lesson.id, className: 'm-6 mt-10 flex h-32 w-32 items-center justify-center rounded-full', bgColor: bgColor, ...(disabled && { disabled: true }), children: _jsx(KnowledgeIcon, { className: 'w-28 h-28 text-gray-600 hover:text-black' }) }), _jsx(Link, { to: t('/lesson') + '/' + lesson.id, className: "max-w-xs mb-3 text-center font-bold", children: lesson.lessonName })] }));
}
