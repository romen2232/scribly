import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface IRatingProps {
    rating: number;
    handleRating: (rating: number) => void;
}

export default function Rating(props: IRatingProps) {
    const [rating, setRating] = useState(props.rating);
    const [hover, setHover] = useState(0);
    const { t } = useTranslation();

    const processRating = (rating: number) => {
        setRating(rating);
        props.handleRating(rating);
    };

    return (
        <>
            <div className="flex flex-col items-center gap-2">
                <span className="flex items-center gap-4 rounded text-xs text-slate-500">
                    <span
                        className="flex gap-1 text-amber-400"
                        role="img"
                        aria-label={t('rating.AverageRating')}
                    >
                        {Array(5)
                            .fill('')
                            .map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    role="button"
                                    name="puntuación media"
                                    className="focus:outline-none"
                                    onClick={() => processRating(i + 1)}
                                    onMouseEnter={() => setHover(i + 1)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={
                                            i + 1 <= (hover || rating)
                                                ? 'currentColor'
                                                : 'none'
                                        }
                                        stroke="currentColor"
                                        className="h-3.5 w-3.5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            ))}
                    </span>
                </span>
            </div>
        </>
    );
}
