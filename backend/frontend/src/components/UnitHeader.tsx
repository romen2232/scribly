import { t } from 'i18next';
import { Link } from 'react-router-dom';
import { LessonPlayIcon } from '../assets/icons/Icons';
import { Button } from './Button';
import { determineLightColor, getColor } from '../utils/functions';

export interface IUnitHeaderProps {
    unitNumber: number;
    description: string;
    backgroundColor: string;
}

export function UnitHeader({
    unitNumber,
    description,
    backgroundColor,
}: IUnitHeaderProps) {

    const hexColor = getColor(backgroundColor);
    const isLightColor = determineLightColor(hexColor);

    //TODO: determine a good way to do this
    const currentLesson = Math.floor(Math.random() * 75) + 1;

    return (
        <Button
            className={`w-full max-w-2xl rounded-xl px-3 py-1.5 ${isLightColor?"text-black":"text-white"}`}
            bgColor={backgroundColor}
        >
            <header className="flex w-96 items-center justify-between p-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">
                        {t('lessons.Unit') + ' ' + unitNumber}
                    </h2>
                    <p className="text-lg">{description}</p>
                </div>
                {/* TODO: link to the current lesson */}
                <Link
                    to={t('/lesson' + '/' + currentLesson)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"
                >
                    <LessonPlayIcon size={32} />
                </Link>
            </header>
        </Button>
    );
}
