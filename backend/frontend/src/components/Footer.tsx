import { Link } from 'react-router-dom';
import { CategoryIcon, AddIcon, FolderIcon } from '../assets/icons/Icons';
import { useTranslation } from 'react-i18next';

export interface IFooterProps {
    children?: React.ReactNode;
    onFooterModalClick: () => void;
}

export function Footer(props: IFooterProps) {
    const { t } = useTranslation();
    //Footer with smooth backdrop blur at the edge and fixed position
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 h-[6.5rem] w-full flex-shrink-0">
            <div className="absolute h-full w-full">
                <nav className="footerMask relative z-10 flex h-full flex-row items-center justify-around">
                    {/* TODO: When the style change, change the footer */}
                    <button onClick={props.onFooterModalClick}>
                        <CategoryIcon className="h-12 w-12 duration-300 ease-in-out transition hover:text-tiviElectricViolet" />
                    </button>
                    <Link to={t('/note')}>
                        <AddIcon className="h-12 w-12 duration-300 ease-in-out transition hover:text-tiviElectricViolet" />
                    </Link>
                    <Link to={t('/folders')}>
                        <FolderIcon className="h-12 w-12 duration-300 ease-in-out transition hover:text-tiviElectricViolet" />
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
