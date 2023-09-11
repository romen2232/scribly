import { BadgeType, BadgeUser, User } from '../utils/types';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { parseCookies } from 'nookies';
import Badge from './Badge';
import { useEffect, useState } from 'react';
import { listUserBadges, listBadges } from '../services/badges';
import { useTranslation } from 'react-i18next';

export interface IBadgeDisplayProps {
    user: User;
}

export default function BadgesDisplay(props: IBadgeDisplayProps) {
    const cookies = parseCookies();
    const [badges, setBadges] = useState<BadgeUser[]>([]);
    const [allBadges, setAllBadges] = useState<BadgeType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        listUserBadges(props.user.id, cookies[AUTH_COOKIE_NAME])
            .then((response) => {
                setBadges(response as BadgeUser[]);
            })
            .catch((error) => {
                console.log(error);
            });
        if (badges.length < 3) {
            listBadges(cookies[AUTH_COOKIE_NAME])
                .then((response) => {
                    setAllBadges(response as BadgeType[]);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    return (
        <section className='w-full'>
            <div className="flex flex-row justify-between w-full px-12">
                <p className="text-lg font-bold w-full text-gray-700 px-2">
                    {t('badge.Title')}
                </p>
            </div>

            <div className="m-4 flex flex-col flex-wrap justify-center rounded-lg border-2 border-b-0">
                {badges
                    // Sort by progress and then by level
                    .sort(
                        (a, b) =>
                            b.badgeProgress / b.badge.badgeGoal -
                                a.badgeProgress / a.badge.badgeGoal ||
                            b.badge.badgeLevel - a.badge.badgeLevel,
                    )
                    // Get the first 3 badges
                    .slice(0, 3)
                    // Display them
                    .map((badge) => (
                        <Badge
                            badge={badge.badge}
                            key={badge.badge.id}
                            progress={badge.badgeProgress}
                        />
                    ))}
                {badges.length < 3 &&
                    allBadges
                        .filter(
                            (badge) =>
                                !badges.some(
                                    (userBadge) =>
                                        userBadge.badge.id === badge.id,
                                ),
                        )
                        // Sort by level
                        .sort((a, b) => b.badgeLevel - a.badgeLevel)
                        // Get the first 3 badges
                        .slice(0, 3 - badges.length)
                        // Display them
                        .map((badge) => (
                            <Badge
                                badge={badge}
                                key={badge.id}
                                progress={0}
                                grayscale={true}
                            />
                        ))}{' '}
                {/* TODO: Make a see more */}
            </div>
        </section>
    );
}
