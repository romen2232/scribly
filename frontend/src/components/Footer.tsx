import { Link } from 'react-router-dom';
import { CATEGORY_URL, NOTE_URL, FOLDER_URL } from '../utils/consts';

export interface IFooterProps {
    children?: React.ReactNode;
    onFooterModalClick: () => void;
}

export function Footer(props: IFooterProps) {
    return (
        <footer className="h-[6.5rem] w-full">
            <nav className="flex h-full flex-row items-center justify-around">
                <button onClick={props.onFooterModalClick}>
                    <img src={CATEGORY_URL} alt="Category logo" />
                </button>
                <Link to="/new">
                    <img src={NOTE_URL} alt="New note" />
                </Link>
                <Link to="/folders">
                    <img src={FOLDER_URL} alt="Folders" />
                </Link>
            </nav>
        </footer>
    );
}
