import { useTranslation } from 'react-i18next';
import { BadgeType } from '../utils/types';
import ProgressBar from './ProgressBar';

export interface IBadgeProps {
    badge: BadgeType;
    progress: number;
    grayscale?: boolean;
}

export default function Badge(props: IBadgeProps) {
    const { t } = useTranslation();

    //TODO: DELETE THIS
    props.badge.badgeColor = 'tiviElectricPurple';
    return (
        <article className="flex items-center border-b-2 p-6">
            {/* TODO: Make this a button to display a modal with badge info */}
            <div
                style={{
                    filter: `drop-shadow(2px 4px 2px #9c9696) grayscale(${
                        props.grayscale ? '100%' : '0%'
                    }`,
                }}
            >
                <div
                    className={`items-center justify-center bg-${props.badge.badgeColor}-100 group m-2 h-24 w-24 overflow-hidden rounded-lg p-2`}
                    style={{
                        // Clip the image to a hexagon
                        clipPath:
                            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                    }}
                >
                    {/* TODO: The level should not move */}
                    <div className="relative left-5 h-10 w-10 pt-2 group-hover:h-12 group-hover:w-12 group-hover:-translate-x-1 group-hover:-translate-y-1">
                        <img
                            src={props.badge.badgeImage}
                            alt={props.badge.badgeName}
                        />
                    </div>
                    <p className="pt-3 text-center text-xs font-extrabold text-gray-700 group-hover:-translate-y-2">
                        {t('badge.Level') + ' ' + props.badge.badgeLevel}
                    </p>
                </div>
            </div>
            <div className="flex w-full flex-col justify-center gap-3 px-5">
                <p className="text-lg font-bold text-gray-700">
                    {props.badge.badgeName.toUpperCase()}
                </p>
                <p className="text-sm text-gray-500">
                    {props.badge.badgeDescription}
                </p>
                <ProgressBar
                    progressValue={props.progress}
                    progressMax={props.badge.badgeGoal}
                    progressColor="tiviElectricPurple"
                />
            </div>
        </article>
    );
}
