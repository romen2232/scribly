import { UnitHeader } from './UnitHeader';
import { LessonIcon } from './LessonIcon';
import { UnitType } from '../utils/types';
import { useState } from 'react';

export interface IUnitProps {
    unit: UnitType;
}

export function Unit({ unit }: IUnitProps) {
    const { lessons, unitColor, unitDescription, unitNumber } = unit;

    const [areLessonsVisible, setAreLessonsVisible] = useState(false);
    return (
        <div className="py-6">
            <div onClick={() => setAreLessonsVisible(!areLessonsVisible)}>
                <UnitHeader
                    unitNumber={unitNumber}
                    description={unitDescription}
                    backgroundColor={unitColor}
                />
            </div>
            <div className="flex flex-col items-center justify-center">
                {areLessonsVisible &&
                    lessons.map((lesson, index) => {
                        let margin = 'ml-16';
                        if (index % 2 === 0) margin = 'mr-16';

                        const disabled = lesson.percentageCompleted === 0;

                        return (
                            <LessonIcon
                                key={lesson.id}
                                bgColor={lesson.lessonColor}
                                lesson={lesson}
                                extraClasses={margin}
                                disabled={disabled}
                            />
                        );
                    })}
            </div>
        </div>
    );
}
