import { Learn } from '../components/Learn';
import { Aside } from '../components/Aside';
import Scribly from '../components/Scribly';
import { AsideButton } from '../components/AsideButton';
import {
    AddIcon,
    CategoryIcon,
    CommunityIcon,
    FolderIcon,
    PoetryIcon,
    ProfileIcon,
    ProseIcon,
    ScriptIcon,
} from '../assets/icons/Icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useCategoryStore } from '../stores/categoryStore';
import { useLocation } from 'react-router';
import { About } from '../components/About';
import { Link } from 'react-router-dom';

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = () => {
    const { t } = useTranslation();

    const [showSubButtons, setShowSubButtons] = useState(false);
    const { setCategory, category } = useCategoryStore();
    const location = useLocation();

    const renderCategoryButton = (cat: string) => {
        switch (cat) {
            case 'POETRY':
                return (
                    <AsideButton
                        icon={<PoetryIcon className="h-6 w-6" />}
                        title={t('category.Poetry')}
                        onClick={() => {
                            setCategory('POETRY');
                            setShowSubButtons(!showSubButtons);
                        }}
                        className="ml-10 w-48 "
                        {...(category === 'POETRY' &&
                            !showSubButtons && { disabled: true })}
                        bgColor="hover:bg-primaryBlue-400"
                    />
                );
            case 'PROSE':
                return (
                    <AsideButton
                        icon={<ProseIcon className="h-6 w-6" />}
                        title={t('category.Prose')}
                        onClick={() => {
                            setCategory('PROSE');
                            setShowSubButtons(!showSubButtons);
                        }}
                        className="ml-10 w-48 "
                        {...(category === 'PROSE' &&
                            !showSubButtons && { disabled: true })}
                        bgColor="hover:bg-primaryPink-400"
                    />
                );
            case 'SCRIPT':
                return (
                    <AsideButton
                        icon={<ScriptIcon className="h-6 w-6" />}
                        title={t('category.Script')}
                        onClick={() => {
                            setCategory('SCRIPT');
                            setShowSubButtons(!showSubButtons);
                        }}
                        className="ml-10 w-48 "
                        {...(category === 'SCRIPT' &&
                            !showSubButtons && { disabled: true })}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-full w-full items-center justify-between">
            <Aside>
                <Link to={t('/')}>
                    <Scribly />
                </Link>

                <nav className="flex h-full w-64 flex-col items-start justify-between ">
                    <ul className="w-full">
                        <AsideButton
                            icon={<FolderIcon className="h-6 w-6" />}
                            title={t('folders.Title')}
                            linkTo={t('/folders')}
                        />
                        <AsideButton
                            icon={<AddIcon className="h-6 w-6" />}
                            title={t('note.NewNote')}
                            linkTo={t('/note')}
                        />
                        <AsideButton
                            icon={<CategoryIcon className="h-6 w-6" />}
                            title={t('category.Title')}
                            onClick={() => setShowSubButtons(!showSubButtons)}
                        />
                        <div className=" flex flex-col">
                            {renderCategoryButton(category)}
                            {showSubButtons && (
                                <>
                                    {category !== 'POETRY' &&
                                        renderCategoryButton('POETRY')}
                                    {category !== 'PROSE' &&
                                        renderCategoryButton('PROSE')}
                                    {category !== 'SCRIPT' &&
                                        renderCategoryButton('SCRIPT')}
                                </>
                            )}
                        </div>
                    </ul>

                    <ul className="w-full">
                        <AsideButton
                            icon={<ProfileIcon className="h-6 w-6" />}
                            title={t('profile.Title')}
                            linkTo={t('/profile')}
                        />
                        <AsideButton
                            icon={<CommunityIcon className="h-6 w-6" />}
                            title={t('community.Title')}
                            linkTo={t('/community')}
                        />

                        {location.pathname === t('/about') && (
                            <AsideButton
                                icon={<ProfileIcon className="h-6 w-6" />}
                                title={t('lessons.Title')}
                                linkTo={t('/')}
                            />
                        )}

                        {location.pathname === t('/') && (
                            <AsideButton
                                icon={<ProfileIcon className="h-6 w-6" />}
                                title={t('about.Title')}
                                linkTo={t('/about')}
                            />
                        )}
                    </ul>
                </nav>
            </Aside>
            {location.pathname === t('/about') && <About />}
            {location.pathname === t('/') && <Learn />}
        </div>
    );
};

export default Home;
