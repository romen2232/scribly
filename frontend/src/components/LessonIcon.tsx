import { t } from 'i18next';
import { KnowledgeIcon } from '../assets/icons/Icons';
// import { Link } from 'react-router-dom';
import { Lesson } from '../utils/types';
import { Button } from './Button';

export interface ILessonIconProps {
    bgColor: string;
    extraClasses?: string;
    lesson: Lesson;
    disabled?: boolean;
}

//TODO: add animation of percentage completed

export function LessonIcon({
    bgColor,
    lesson,
    extraClasses,
    disabled,
}: ILessonIconProps) {
    const finalClasses = [
        'rounded-full p-6 w-32 h-32 flex items-center justify-center',
        extraClasses,
    ];

    if (disabled) finalClasses.push('opacity-50 cursor-not-allowed');

    return (
        <Button
            linkTo={t('/lesson') + '/' + lesson.id}
            className={finalClasses.join(' ')}
            bgColor={bgColor}
            {...(disabled && { disabled: true })}
        >
            <KnowledgeIcon />
        </Button>
    );
}
