import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import { retrieveUserByUsername } from '../services/user';
import { parseCookies } from 'nookies';
import { USER_COOKIE_NAME, AUTH_COOKIE_NAME } from '../utils/consts';
import { User } from '../utils/types';
import { lazy, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from './loader';
import { Header } from '../components/Header';
import BadgesDisplay from '../components/BadgesDisplay';
import PostsScroll from '../components/PostsScroll';
import { listNotes } from '../services/notes';
import { Note } from '../utils/types';
import { LogoutIcon } from '../assets/icons/Icons';
import { AuthContext } from '../hoc/auth/context';

const PageNotFound = lazy(() => import('./pageNotFound'));

const Profile = () => {
    const { t } = useTranslation();
    const { username } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const cookies = parseCookies();
    const loggedUsername = JSON.parse(cookies[USER_COOKIE_NAME]).username;
    const [posts, setPosts] = useState<Note[]>([]);
    const {logout} = useContext(AuthContext);

    //TODO: change list Notes to list Notes by user
    useEffect(() => {
        listNotes(cookies[AUTH_COOKIE_NAME])
            .then((response) => {
                setPosts(response);
            })
            .catch((error) => {
                toast.error(t(error.message));
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        retrieveUserByUsername(
            cookies[AUTH_COOKIE_NAME],
            username ?? loggedUsername,
        )
            .then((response) => {
                setUser(response as User);
                setLoading(false);
            })
            .catch((error) => {
                toast.error(t(error.message));
                setLoading(false);
            });
    }, [username]);

    if (loading) {
        return <Loader />;
    }
    if (!user) {
        return <PageNotFound />;
    }
    return (
        <div className='overflow-x-hidden'>
            <Header>
                <div className="h-fill flex items-center">
                        <button onClick={logout} className='mx-16
                        + text-3xl font-bold'>
                            <LogoutIcon/>
                        </button>
                </div>
            </Header>
            <div className='flex flex-row-reverse items-center p-8'>
                <UserInfo user={user} />
                <BadgesDisplay user={user} />
            </div>
            <PostsScroll posts={posts} />
        </div>
    );
};

export default Profile;
