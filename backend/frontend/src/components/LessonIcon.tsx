import { t } from 'i18next';
import { KnowledgeIcon } from '../assets/icons/Icons';
// import { Link } from 'react-router-dom';
import { Lesson } from '../utils/types';
import { Button } from './Button';
import { Link } from 'react-router-dom';

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
    const finalClasses = ['flex flex-col', extraClasses];

    if (disabled) finalClasses.push('opacity-50 cursor-not-allowed');

    return (
        <div className={finalClasses.join(' ')}>
            <Button
                linkTo={t('/lesson') + '/' + lesson.id}
                className={
                    'mx-6 mt-10 flex h-32 w-32 items-center justify-center rounded-full'
                }
                bgColor={bgColor}
                {...(disabled && { disabled: true })}
            >
                <KnowledgeIcon />
            </Button>
            <Link
                to={t('/lesson') + '/' + lesson.id}
                className="absolute -bottom-12 w-full text-center font-bold"
            >
                {lesson.lessonName}
            </Link>
        </div>
    );
}
