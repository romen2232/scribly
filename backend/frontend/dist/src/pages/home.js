import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Learn } from '../components/Learn';
import { Aside } from '../components/Aside';
import Scribly from '../components/Scribly';
import { AsideButton } from '../components/AsideButton';
import { AddIcon, CategoryIcon, CommunityIcon, FolderIcon, PoetryIcon, ProfileIcon, ProseIcon, ScriptIcon, } from '../assets/icons/Icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useCategoryStore } from '../stores/categoryStore';
import { useLocation } from 'react-router';
import { About } from '../components/About';
import { Link } from 'react-router-dom';
const Home = () => {
    const { t } = useTranslation();
    const [showSubButtons, setShowSubButtons] = useState(false);
    const { setCategory, category } = useCategoryStore();
    const location = useLocation();
    const renderCategoryButton = (cat) => {
        switch (cat) {
            case 'POETRY':
                return (_jsx(AsideButton, { icon: _jsx(PoetryIcon, { className: "h-6 w-6" }), title: t('category.Poetry'), onClick: () => {
                        setCategory('POETRY');
                        setShowSubButtons(!showSubButtons);
                    }, className: "ml-10 w-48 ", ...(category === 'POETRY' &&
                        !showSubButtons && { disabled: true }), bgColor: "hover:bg-primaryBlue-400" }));
            case 'PROSE':
                return (_jsx(AsideButton, { icon: _jsx(ProseIcon, { className: "h-6 w-6" }), title: t('category.Prose'), onClick: () => {
                        setCategory('PROSE');
                        setShowSubButtons(!showSubButtons);
                    }, className: "ml-10 w-48 ", ...(category === 'PROSE' &&
                        !showSubButtons && { disabled: true }), bgColor: "hover:bg-primaryPink-400" }));
            case 'SCRIPT':
                return (_jsx(AsideButton, { icon: _jsx(ScriptIcon, { className: "h-6 w-6" }), title: t('category.Script'), onClick: () => {
                        setCategory('SCRIPT');
                        setShowSubButtons(!showSubButtons);
                    }, className: "ml-10 w-48 ", ...(category === 'SCRIPT' &&
                        !showSubButtons && { disabled: true }) }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "flex h-full w-full items-center justify-between", children: [_jsxs(Aside, { children: [_jsx(Link, { to: t('/'), children: _jsx(Scribly, {}) }), _jsxs("nav", { className: "flex h-full w-64 flex-col items-start justify-between ", children: [_jsxs("ul", { className: "w-full", children: [_jsx(AsideButton, { icon: _jsx(FolderIcon, { className: "h-6 w-6" }), title: t('folders.Title'), linkTo: t('/folders') }), _jsx(AsideButton, { icon: _jsx(AddIcon, { className: "h-6 w-6" }), title: t('note.NewNote'), linkTo: t('/note') }), _jsx(AsideButton, { icon: _jsx(CategoryIcon, { className: "h-6 w-6" }), title: t('category.Title'), onClick: () => setShowSubButtons(!showSubButtons) }), _jsxs("div", { className: " flex flex-col", children: [renderCategoryButton(category), showSubButtons && (_jsxs(_Fragment, { children: [category !== 'POETRY' &&
                                                        renderCategoryButton('POETRY'), category !== 'PROSE' &&
                                                        renderCategoryButton('PROSE'), category !== 'SCRIPT' &&
                                                        renderCategoryButton('SCRIPT')] }))] })] }), _jsxs("ul", { className: "w-full", children: [_jsx(AsideButton, { icon: _jsx(ProfileIcon, { className: "h-6 w-6" }), title: t('profile.Title'), linkTo: t('/profile') }), _jsx(AsideButton, { icon: _jsx(CommunityIcon, { className: "h-6 w-6" }), title: t('community.Title'), linkTo: t('/community') }), location.pathname === t('/about') && (_jsx(AsideButton, { icon: _jsx(ProfileIcon, { className: "h-6 w-6" }), title: t('lessons.Title'), linkTo: t('/') })), location.pathname === t('/') && (_jsx(AsideButton, { icon: _jsx(ProfileIcon, { className: "h-6 w-6" }), title: t('about.Title'), linkTo: t('/about') }))] })] })] }), location.pathname === t('/about') && _jsx(About, {}), location.pathname === t('/') && _jsx(Learn, {})] }));
};
export default Home;
