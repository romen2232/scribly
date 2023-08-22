import { t } from 'i18next';
import { MdOutlinePlayLesson } from 'react-icons/md';
import { Link } from 'react-router-dom';

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
    return (
        <article
            className={[
                'mb-8 max-w-2xl rounded-xl text-black',
                backgroundColor,
            ].join(' ')}
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
                    to=""
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"
                >
                    <MdOutlinePlayLesson size={32} />
                </Link>
            </header>
        </article>
    );
}
