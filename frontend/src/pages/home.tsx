// import { Header } from '../components/HeaderHome';
import { Learn } from '../components/Learn';
// import { Footer } from '../components/Footer';
// import { LargeModal } from '../components/LargeModal';
// import { useState } from 'react';
// import { Streak } from '../components/Streak';
// import { Category } from '../components/Category';
import { Aside } from '../components/Aside';
import Scribly from '../components/Scribly';
import { AsideButton } from '../components/AsideButton';
import {
    AddIcon,
    CategoryIcon,
    CommunityIcon,
    FolderIcon,
    ProfileIcon,
} from '../assets/icons/Icons';
import { useTranslation } from 'react-i18next';

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = () => {
    const { t } = useTranslation();
    // const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
    // const [LargeModalType, setLargeModalType] = useState('');

    // const handleLargeModalClick = (type: string) => {
    //     setIsLargeModalOpen(!isLargeModalOpen);
    //     setLargeModalType(type);
    // };

    return (
        <div className="flex h-full w-full items-center justify-between">
            <Aside>
                <Scribly />

                <nav className="flex h-full w-64 flex-col items-start justify-between pt-16">
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
                        />
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

                        <AsideButton
                            icon={<ProfileIcon className="h-6 w-6" />}
                            title={t('knowMore')}
                            linkTo={t('/knowMore')}
                        />
                    </ul>
                </nav>
            </Aside>
            <Learn />
            {/* <Header />
            <div className="h-full pb-16">
                <Learn />
            </div>
            <Footer
                onFooterModalClick={() => handleLargeModalClick('category')}
            />
            <LargeModal
                isLargeModalOpen={isLargeModalOpen}
                type={LargeModalType}
                onClose={() => {
                    setIsLargeModalOpen(false);
                }}
            >
                {LargeModalType === 'streak' ? (
                    <Streak />
                ) : (
                    <Category
                        onClose={() => {
                            setIsLargeModalOpen(false);
                        }}
                    />
                )}
            </LargeModal> */}
        </div>
    );
};

export default Home;
