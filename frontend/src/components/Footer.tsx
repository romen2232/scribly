import { Link } from 'react-router-dom';
import { FaFeatherAlt, FaFolder } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';

export interface IFooterProps {
    children?: React.ReactNode;
    onFooterModalClick: () => void;
}

export function Footer(props: IFooterProps) {
    return (
        <footer className="h-[6.5rem] w-full">
            <nav className="flex h-full flex-row items-center justify-around">
                <button onClick={props.onFooterModalClick}>
                    <FaFeatherAlt className="h-12 w-12 transition duration-300 ease-in-out hover:text-tiviElectricViolet" />
                </button>
                <Link to="/new">
                    <IoIosAddCircle className="h-12 w-12 transition duration-300 ease-in-out hover:text-tiviElectricViolet" />
                </Link>
                <Link to="/folders">
                    <FaFolder className="h-12 w-12 transition duration-300 ease-in-out hover:text-tiviElectricViolet" />
                </Link>
            </nav>
        </footer>
    );
}
