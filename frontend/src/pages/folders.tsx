import { SearchBar } from '../components/SearchBar';
import { TreeItem } from '../components/TreeItem';
import { Header } from '../components/Header';

interface IFolderProps {}

const Folders: React.FunctionComponent<IFolderProps> = () => {
    return (
        <>
            <Header />
            <h1 className="flex w-full justify-center py-10 text-3xl">
                Folders
            </h1>
            <SearchBar />

            <div className="ml- flex w-full flex-col px-12 text-xl">
                <TreeItem folder={true} favorite={true} index={0} />
                <TreeItem folder={true} index={1} />
                <TreeItem folder={true} index={2} />
                <TreeItem folder={true} index={3} />
                <TreeItem folder={true} index={4} />
                <TreeItem folder={true} index={5} />
                <TreeItem folder={true} index={6} />
                <TreeItem folder={false} index={4} />
            </div>
        </>
    );
};

export default Folders;
