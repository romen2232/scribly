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
    const [currentLesson, setCurrentLesson] = useState<number>();

    const [areLessonsVisible, setAreLessonsVisible] = useState(first);

    const [firstTime, setFirstTime] = useState(false);
    return (
        <div className="py-6">
            <div onClick={() => setAreLessonsVisible(!areLessonsVisible)}>
                <UnitHeader
                    unitNumber={unitNumber}
                    description={unitName}
                    backgroundColor={unitColor}
                    currentLesson={currentLesson}
                />
            </div>
            <div className="flex flex-col items-center justify-center">
                {areLessonsVisible &&
                    lessons.map((lesson, index) => {
                        let margin = 'ml-16',
                            disabled = false;
                        if (index % 2 === 0) margin = 'mr-16';

                        if (index > 0) {
                            if (
                                lesson.percentage === 0 &&
                                lessons[index - 1].percentage !== 0
                            ) {
                                if (firstTime) {
                                    setCurrentLesson(lessons[index - 1].id);
                                    setFirstTime(false);
                                } else {
                                    disabled = true;
                                }
                            } else if (
                                lesson.percentage === 0 &&
                                lessons[index - 1].percentage === 0
                            ) {
                                disabled = true;
                            }
                        }
                        return (
                            <LessonIcon
                                key={lesson.id}
                                bgColor={'secondaryYellow-500'}
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
