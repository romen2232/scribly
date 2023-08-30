import { t } from 'i18next';
import { KnowledgeIcon } from '../assets/icons/Icons';
import { Link } from 'react-router-dom';
import { Lesson } from '../utils/types';

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
    const bgNumber: number = +bgColor?.split('-')[2];
    const shadowNumber = bgNumber + 100;
    const tailBgColor = bgColor || 'bg-tiviElectricPurple-50';
    const tailShadowColor =
        bgColor.split('-').slice(0, 2).join('-') + '-' + shadowNumber ||
        'bg-tiviElectricPurple-100';

    const finalClasses = [
        'rounded-full  bg-tiviElectricPurple-100 bg-tiviElectricPurple-50 p-6 shadow-inner-lg active:translate-y-1.5 active:shadow-none w-min',
        tailBgColor,
        tailShadowColor,
        extraClasses,
    ];

    if (disabled) {
        finalClasses.push('opacity-50 cursor-not-allowed');
        return (
            <div
                className={finalClasses
                    .join(' ')
                    .replace('active:translate-y-1.5 active:shadow-none', '')}
            >
                <KnowledgeIcon />
            </div>
        );
    }

    return (
        <Link
            to={t('/lesson') + '/' + lesson.id}
            className={finalClasses.join(' ')}
        >
            <KnowledgeIcon />
        </Link>
    );
}
