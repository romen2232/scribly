import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { parseCookies } from 'nookies';
import Badge from './Badge';
import { useEffect, useState } from 'react';
import { listUserBadges, listBadges } from '../services/badges';
import { useTranslation } from 'react-i18next';
export default function BadgesDisplay(props) {
    const cookies = parseCookies();
    const [badges, setBadges] = useState([]);
    const [allBadges, setAllBadges] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        listUserBadges(props.user.id, cookies[AUTH_COOKIE_NAME])
            .then((response) => {
            setBadges(response);
        })
            .catch((error) => {
            console.log(error);
        });
        if (badges.length < 3) {
            listBadges(cookies[AUTH_COOKIE_NAME])
                .then((response) => {
                setAllBadges(response);
            })
                .catch((error) => {
                console.log(error);
            });
        }
    }, []);
    return (_jsxs("section", { className: 'w-full', children: [_jsx("div", { className: "flex flex-row justify-between w-full px-12", children: _jsx("p", { className: "text-lg font-bold w-full text-gray-700 px-2", children: t('badge.Title') }) }), _jsxs("div", { className: "m-4 flex flex-col flex-wrap justify-center rounded-lg border-2 border-b-0", children: [badges
                        // Sort by progress and then by level
                        .sort((a, b) => b.badgeProgress / b.badge.badgeGoal -
                        a.badgeProgress / a.badge.badgeGoal ||
                        b.badge.badgeLevel - a.badge.badgeLevel)
                        // Get the first 3 badges
                        .slice(0, 3)
                        // Display them
                        .map((badge) => (_jsx(Badge, { badge: badge.badge, progress: badge.badgeProgress }, badge.badge.id))), badges.length < 3 &&
                        allBadges
                            .filter((badge) => !badges.some((userBadge) => userBadge.badge.id === badge.id))
                            // Sort by level
                            .sort((a, b) => b.badgeLevel - a.badgeLevel)
                            // Get the first 3 badges
                            .slice(0, 3 - badges.length)
                            // Display them
                            .map((badge) => (_jsx(Badge, { badge: badge, progress: 0, grayscale: true }, badge.id))), ' '] })] }));
}
