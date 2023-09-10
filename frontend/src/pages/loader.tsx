import { useTranslation } from 'react-i18next';
import '../assets/styles/loader.css';

export interface ILoaderProps {
    text?: string;
}

// https://codepen.io/borntofrappe/pen/yxExMw
const Loader = ({ text }: ILoaderProps) => {
    const { t } = useTranslation();
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="card">
                <div className="moon shrink-0">
                    <div className="eye left"></div>
                    <div className="eye right"></div>
                    <div className="mouth"></div>
                </div>
                <p className="m-0 max-w-xs">{text || t('Loading')}</p>
            </div>
        </div>
    );
};

export default Loader;
