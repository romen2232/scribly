import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import ProgressBar from './ProgressBar';
export default function Badge(props) {
    const { t } = useTranslation();
    //TODO: DELETE THIS
    props.badge.badgeColor = 'tiviElectricPurple';
    return (_jsxs("article", { className: "flex items-center border-b-2 p-6", children: [_jsx("div", { style: {
                    filter: `drop-shadow(2px 4px 2px #9c9696) grayscale(${props.grayscale ? '100%' : '0%'}`,
                }, children: _jsxs("div", { className: `items-center justify-center bg-${props.badge.badgeColor}-100 group m-2 h-24 w-24 overflow-hidden rounded-lg p-2`, style: {
                        // Clip the image to a hexagon
                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                    }, children: [_jsx("div", { className: "relative left-5 h-10 w-10 pt-2 group-hover:h-12 group-hover:w-12 group-hover:-translate-x-1 group-hover:-translate-y-1", children: _jsx("img", { src: props.badge.badgeImage, alt: props.badge.badgeName }) }), _jsx("p", { className: "pt-3 text-center text-xs font-extrabold text-gray-700 group-hover:-translate-y-2", children: t('badge.Level') + ' ' + props.badge.badgeLevel })] }) }), _jsxs("div", { className: "flex w-full flex-col justify-center gap-3 px-5", children: [_jsx("p", { className: "text-lg font-bold text-gray-700", children: props.badge.badgeName.toUpperCase() }), _jsx("p", { className: "text-sm text-gray-500", children: props.badge.badgeDescription }), _jsx(ProgressBar, { progressValue: props.progress, progressMax: props.badge.badgeGoal, progressColor: "tiviElectricPurple" })] })] }));
}
