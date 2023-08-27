import { Header } from '../components/HeaderHome';
import { Learn } from '../components/Learn';
import { Footer } from '../components/Footer';
import { LargeModal } from '../components/LargeModal';
import { useState } from 'react';
import { Streak } from '../components/Streak';
import { Category } from '../components/Category';

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = () => {
    const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
    const [LargeModalType, setLargeModalType] = useState('');

    const handleLargeModalClick = (type: string) => {
        setIsLargeModalOpen(!isLargeModalOpen);
        setLargeModalType(type);
    };

    return (
        <div className="flex h-full w-full flex-col items-center justify-between">
            <Header
            // onHeaderModalClick={() => handleLargeModalClick('streak')}
            />
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
            </LargeModal>
        </div>
    );
};

export default Home;
