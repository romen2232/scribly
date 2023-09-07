import { StarIcon, StarOutlineIcon } from '../assets/icons/Icons';

export interface ISearchBarProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showFavorites: boolean;
    setShowFavorites: (showFavorites: boolean) => void;
}

export function SearchBar({
    onChange,
    showFavorites,
    setShowFavorites,
}: ISearchBarProps) {
    return (
        <div className="my-5 mr-10 w-full">
            <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg bg-mainBackground-100  shadow-lg">
                <label
                    className="grid h-full w-12 cursor-text place-items-center text-gray-300"
                    htmlFor="search"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </label>

                <input
                    className="peer h-full w-full bg-mainBackground-100 pr-2 text-sm text-gray-700 outline-none"
                    type="text"
                    id="search"
                    placeholder="Carpetas, notas..."
                    autoComplete="off"
                    onChange={onChange}
                />

                <div className="flex h-full items-center justify-center border-l-1 border-gray-200 px-4 text-gray-400">
                    {showFavorites ? (
                        <StarIcon
                            className="h-7 w-7"
                            onClick={() => setShowFavorites(false)}
                        />
                    ) : (
                        <StarOutlineIcon
                            className="h-7 w-7"
                            onClick={() => setShowFavorites(true)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
