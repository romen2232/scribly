import { Header } from '../components/Header';
import { Note } from '../components/Note';

interface INewProps {}

const New: React.FunctionComponent<INewProps> = () => {
    return (
        <div className="h-full max-h-screen overflow-hidden text-tiviBlack">
            <Header />
            <main className=" flex h-full flex-col">
                <Note folder={{ folderName: 'Folder' }} />
            </main>
        </div>
    );
};

export default New;
