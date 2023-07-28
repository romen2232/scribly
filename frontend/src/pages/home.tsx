import { Header } from '../components/HeaderHome';
import { Learn } from '../components/Learn';
import { Footer } from '../components/Footer';
import { Modal } from '../components/Modal';
import { useState } from 'react';
import { Streak } from '../components/Streak';
import { Forest } from '../components/Forest';

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    const handleModalClick = (type: string) => {
        setIsModalOpen(!isModalOpen);
        setModalType(type);
    };

    return (
        <div className="flex h-full w-full flex-col items-center justify-between">
            <Header onHeaderModalClick={() => handleModalClick('streak')} />
            <Learn />
            <Footer onFooterModalClick={() => handleModalClick('forest')} />
            <Modal
                isModalOpen={isModalOpen}
                type={modalType}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            >
                {modalType === 'streak' ? (
                    <Streak />
                ) : (
                    <Forest
                        onClose={() => {
                            setIsModalOpen(false);
                        }}
                    />
                )}
            </Modal>
        </div>
    );
};

export default Home;
