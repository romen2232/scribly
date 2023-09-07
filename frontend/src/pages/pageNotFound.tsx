import { Header } from '../components/Header';
import '../assets/styles/notFound.css';

const PageNotFound: React.FC = () => {
    return (
        <div id="notFound">
            <Header />
            <main id="main">
                <div className="fof">
                    <h1>Error 404</h1>
                </div>
            </main>
        </div>
    );
};

export default PageNotFound;
