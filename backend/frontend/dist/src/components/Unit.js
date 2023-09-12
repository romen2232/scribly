import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UnitHeader } from './UnitHeader';
import { LessonIcon } from './LessonIcon';
import { useState } from 'react';
export function Unit({ unit, first }) {
    const { lessons, unitColor, unitName, unitNumber } = unit;
    const [areLessonsVisible, setAreLessonsVisible] = useState(first);
    /**
     * @param index index of the lesson
     * @param unit number of the unit
     * @returns alignment of the lesson
     */
    const alignment = (index, even) => {
        switch (index % 4) {
            case 0:
            case 2:
                return 'self-center';
            case 1:
                return even ? 'self-start' : 'self-end';
            case 3:
                return even ? 'self-end' : 'self-start';
        }
    };
    return (_jsxs("div", { className: "py-6 w-1/2", children: [_jsx("div", { onClick: () => setAreLessonsVisible(!areLessonsVisible), children: _jsx(UnitHeader, { unitNumber: unitNumber, description: unitName, backgroundColor: unitColor }) }), _jsx("div", { className: "flex flex-col items-center justify-center", children: areLessonsVisible &&
                    lessons.map((lesson, index) => {
                        return (_jsx(LessonIcon, { bgColor: 'secondaryYellow-500', lesson: lesson, extraClasses: alignment(index, unitNumber % 2 === 0) }, lesson.id));
                    }) })] }));
}
