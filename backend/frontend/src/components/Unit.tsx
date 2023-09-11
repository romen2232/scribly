import { UnitHeader } from './UnitHeader';
import { LessonIcon } from './LessonIcon';
import { UnitType } from '../utils/types';
import { useState } from 'react';

export interface IUnitProps {
    unit: UnitType;
    first: boolean;
}

export function Unit({ unit, first }: IUnitProps) {
    const { lessons, unitColor, unitName, unitNumber } = unit;

    const [areLessonsVisible, setAreLessonsVisible] = useState(first);
    /**
     * @param index index of the lesson
     * @param unit number of the unit
     * @returns alignment of the lesson
     */
    const alignment = (index: number, even:boolean) => {
        switch (index % 4) {
            case 0:
            case 2:
                return 'self-center';
            case 1:
                return even?'self-start':'self-end'
            case 3:
                return even?'self-end':'self-start'
        }
    };
    return (
        <div className="py-6 w-1/2">
            <div onClick={() => setAreLessonsVisible(!areLessonsVisible)}>
                <UnitHeader
                    unitNumber={unitNumber}
                    description={unitName}
                    backgroundColor={unitColor}
                />
            </div>
            <div className="flex flex-col items-center justify-center">
                {areLessonsVisible &&
                    lessons.map((lesson, index) => {
                        return (
                            <LessonIcon
                                key={lesson.id}
                                bgColor={'secondaryYellow-500'}
                                lesson={lesson}
                                extraClasses={alignment(index, unitNumber%2===0)}
                            />
                        );
                    })}
            </div>
        </div>
    );
}
