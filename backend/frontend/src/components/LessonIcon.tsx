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
    const finalClasses = ['flex flex-col items-center justify-center', extraClasses];

    if (disabled) finalClasses.push('opacity-50 cursor-not-allowed');

    //TODO: change icon and or add animation
    return (
        <div className={finalClasses.join(' ')}>
            <Button
                linkTo={t('/lesson') + '/' + lesson.id}
                className={
                    'm-6 mt-10 flex h-32 w-32 items-center justify-center rounded-full'
                }
                bgColor={bgColor}
                {...(disabled && { disabled: true })}
            >
                <KnowledgeIcon className='w-28 h-28 text-gray-600 hover:text-black'/>
            </Button>
            <Link
                to={t('/lesson') + '/' + lesson.id}
                className="max-w-xs mb-3 text-center font-bold"
            >
                {lesson.lessonName}
            </Link>
        </div>
    );
}
