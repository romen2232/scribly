import { useTranslation } from 'react-i18next';
import { Follow, User } from '../utils/types';
import { formatDate } from '../utils/functions';
import {
    listUserFollowers,
    listUserFollowings,
    createFollow,
    destroyFollow,
} from '../services/follows';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME, USER_COOKIE_NAME } from '../utils/consts';
import Follows from './Follows'
import { Button } from './Button';

export interface IUserInfoProps {
    user: User;
}

const UserInfo: React.FC<IUserInfoProps> = ({ user }) => {
    const profilePhoto = user.profilePhoto;
    const { t } = useTranslation();
    const [followers, setFollowers] = useState<Follow[]>([]);
    const [followings, setFollowings] = useState<Follow[]>([]);
    const [youFollow, setYouFollow] = useState<boolean>(false);
    const [followsYou, setFollowsYou] = useState<boolean>(false);

    const cookies = parseCookies();
    const loggedUser = JSON.parse(cookies[USER_COOKIE_NAME]);

    useEffect(() => {
        listUserFollowers(user.id, cookies[AUTH_COOKIE_NAME])
            .then((response) => {
                setFollowers(response);
                if (
                    response.some(
                        (follower) => follower.follower.username === loggedUser.username,
                    )
                ) {
                    setYouFollow(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        listUserFollowings(user.id, cookies[AUTH_COOKIE_NAME])
            .then((response) => {
                setFollowings(response);
                if (
                    response.some(
                        (following) =>
                            following.followed.username === loggedUser.username,
                    )
                ) {
                    setFollowsYou(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className='flex flex-col h-full'>
            <div className="flex">
                <div className="w-full overflow-hidden">
                <div className="mx-20 flex w-40 items-center">
                    <img
                        src={profilePhoto ?? '/user.png'}
                        alt="avatar"
                        className="rounded-full border border-gray-500 shadow-sm"
                    />
                </div>
                    <h1 className="text-center text-2xl font-bold">
                        {user.username?.toUpperCase()}
                    </h1>
                    <h2>
                        {(user.firstName ?? '') + ' ' + (user.lastName ?? '')}
                    </h2>
                    <div>
                        <h3 className="px-1.5 text-center text-sm text-gray-700">
                            {t('profile.Since') +
                                ' ' +
                                formatDate(user.dateJoined ?? '')}
                        </h3>
                        <h4>
                            {loggedUser.username !== user.username
                                ? followsYou
                                    ? t('profile.FollowsYou')
                                    : t('profile.DoesNotFollowYou')
                                : null}
                        </h4>
                    </div>
                    <div className="flex justify-around p-5">
                        <Follows type='followers' follows={followers}></Follows>
                        <Follows type='following' follows={followings}></Follows>
                    </div>
                </div>
            </div>
            <div className="flex justify-around py-8">
                {loggedUser.username == user.username ? (
                    // TODO: Make this link to the add friends page
                    <Button
                    className='rounded-lg font-bold text-lg'
                        bgColor='secondaryYellow-500'
                        onClick={() => console.log('Add friends')}

                    >
                        {t('profile.AddFriends')}
                    </Button>
                ) : youFollow ? (
                    <Button
                    className='rounded-lg font-bold text-lg'

                        bgColor='primaryPink-500'
                        onClick={() =>
                            destroyFollow(
                                loggedUser.id,
                                user.id,
                                cookies[AUTH_COOKIE_NAME],
                            )
                        }
                    >
                        {t('profile.Unfollow')}
                    </Button>
                ) : (
                    <Button
                    className='rounded-lg font-bold text-lg'

                        bgColor='primaryBlue-500'
                        onClick={() =>
                            createFollow(
                                loggedUser.id,
                                user.id,
                                cookies[AUTH_COOKIE_NAME],
                            )
                        }
                    >
                        {t('profile.Follow')}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
