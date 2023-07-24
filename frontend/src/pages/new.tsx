import { useNavigate } from 'react-router-dom';
import { NAVIGATE_BACK_URL } from '../utils/consts';

interface INewProps {}

const New: React.FunctionComponent<INewProps> = () => {
    const navigate = useNavigate();

    return (
        <header>
            <button onClick={() => navigate(-1)}>
                <img
                    src={NAVIGATE_BACK_URL}
                    alt="Go back"
                    className="h-12 w-12"
                />
            </button>
        </header>
    );
};

export default New;
