import { useTranslation } from 'react-i18next';
import '../assets/styles/loader.css';

// https://codepen.io/borntofrappe/pen/yxExMw
const Loader = () => {
    const { t } = useTranslation();
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="card">
                <div className="moon">
                    <div className="eye left"></div>
                    <div className="eye right"></div>
                    <div className="mouth"></div>
                </div>
                <p>{t('Loading')}</p>
            </div>
        </div>
    );
};

export default Loader;
