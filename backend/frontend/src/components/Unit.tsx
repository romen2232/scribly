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

    /**
     * @param index index of the lesson
     * @param unit number of the unit
     * @returns alignment of the lesson
     */
    const alignment = (index: number) => {
        switch (index % 5) {
            case 0:
                return 'self-start';
            case 2:
            case 3:
                return 'self-end';
            default:
                return 'self-middle';
        }
    };
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
                        let disabled = false;

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
                                extraClasses={alignment(index)}
                                disabled={disabled}
                            />
                        );
                    })}
            </div>
        </div>
    );
}
