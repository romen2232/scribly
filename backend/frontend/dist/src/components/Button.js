import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { determineLightColor, getColor } from '../utils/functions';
import { Link } from 'react-router-dom';
//TODO: doing the style change is a bit hacky, find a better way to do it
export function Button({ bgColor, className, children, linkTo, ...buttonProps }) {
    const hexColor = getColor(bgColor);
    const isLightColor = determineLightColor(hexColor);
    const [isActive, setIsActive] = useState(false);
    const buttonStyles = {
        backgroundColor: `#${hexColor}`,
        boxShadow: isActive
            ? 'none'
            : isLightColor
                ? 'inset 0 -6px 0 0 rgba(0, 0, 0, 0.06)'
                : 'inset 0 -6px 0 0 rgba(255, 255, 255, 0.13)',
    };
    const containsPaddingClass = /p-\d+/.test(className || '');
    const finalClasses = [
        containsPaddingClass ? '' : 'p-6',
        'active:translate-y-1.5 active:shadow-none-important ',
        className,
    ].filter(Boolean); // Filter out any falsy values
    return linkTo ? (_jsx(Link, { to: linkTo, className: finalClasses.join(' '), style: buttonStyles, onMouseDown: () => setIsActive(true), onMouseUp: () => setIsActive(false), onTouchStart: () => setIsActive(true), onTouchEnd: () => setIsActive(false), onMouseLeave: () => setIsActive(false), children: children })) : (_jsx("button", { className: finalClasses.join(' '), style: buttonStyles, onMouseDown: () => setIsActive(true), onMouseUp: () => setIsActive(false), onTouchStart: () => setIsActive(true), onTouchEnd: () => setIsActive(false), onMouseLeave: () => setIsActive(false), ...buttonProps, children: children }));
}
