import { Link } from 'react-router-dom';
import { Note } from '../utils/types';
import { useTranslation } from 'react-i18next';
import Rating from './Rating';
import { useState } from 'react';
import { useEffect } from 'react';
import {
    createUserNoteRating,
    partialUpdateUserNoteRating,
    retrieveUserNoteRating,
} from '../services/ratings';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';

export interface IPostProps {
    post: Note;
}

export default function Post(props: IPostProps) {
    const { t } = useTranslation();
    const averageRating = Math.round(props.post.noteAverageRating ?? 0);
    const [UserRating, setUserRating] = useState<number | null>();
    const [patched, setPatched] = useState(false);

    const cookies = parseCookies();

    useEffect(() => {
        retrieveUserNoteRating(props.post.id ?? -1, cookies[AUTH_COOKIE_NAME])
            .then((response) => {
                setUserRating(response.rating);
            })
            .catch(() => {
                createUserNoteRating(
                    {
                        note: props.post.id ?? -1,
                        rating: UserRating ?? 0,
                    },
                    cookies[AUTH_COOKIE_NAME],
                );
            });
    }, []);

    useEffect(() => {
        if (patched) {
            partialUpdateUserNoteRating(
                props.post.id ?? -1,
                {
                    note: props.post.id ?? -1,
                    rating: UserRating ?? 0,
                },
                cookies[AUTH_COOKIE_NAME],
            );
            setPatched(false);
        }
    }, [UserRating]);

    return (
        <div className="my-4 flex w-full max-w-3xl flex-col rounded-md border bg-white shadow-md">
            <div className="flex flex-row justify-between px-5 py-2">
                <div className="flex w-full flex-col items-start gap-1">
                    <div className="flex w-full justify-between pr-8">
                        <p className="text-lg font-bold text-gray-700">
                            {props.post.noteName}
                        </p>
                        <p className="text-xs text-gray-400">
                            {new Date(
                                props.post.noteLastModified ?? '2021-01-01',
                            ).toLocaleDateString()}
                        </p>
                    </div>
                    <Rating
                        rating={UserRating ?? averageRating}
                        handleRating={(rating: number) => {
                            setPatched(true);
                            setUserRating(rating);
                        }}
                    />
                </div>
                <Link
                    to={t('/profile') + '/' + props.post.user?.username}
                    className=" flex w-16 items-center"
                >
                    <img
                        src={props.post.user?.profilePhoto ?? '/user.png'}
                        alt={props.post.user?.username ?? 'user'}
                        className="rounded-full border border-gray-500 shadow-sm"
                    />
                </Link>
            </div>
            <div className="flex flex-col px-5 py-2">
                {props.post.noteContent?.length ?? 0 > 500 ? (
                    <p className="text-sm text-gray-500">
                        {props.post.noteContent?.substring(0, 500) + '...'}
                        <Link
                            to=""
                            className="rounded-b-lg p-4 text-center font-semibold text-gray-600 hover:text-tiviElectricPurple-100"
                        >
                            {t('profile.SeeMore')}
                        </Link>
                    </p>
                ) : (
                    <p className="text-sm text-gray-500">
                        {props.post.noteContent}
                    </p>
                )}
            </div>
        </div>
    );
}
