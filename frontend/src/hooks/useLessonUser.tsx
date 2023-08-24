import { retrieveCurrentLessonUser } from '../services/lesson';
import { useNavigate } from 'react-router-dom';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { LessonUser } from '../utils/types';
import { useEffect, useState } from 'react';

const useLessonUser = (lessonId: string) => {
    const [lessonUser, setLessonUser] = useState<LessonUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const cookies = parseCookies();

    if (isNaN(Number(lessonId))) {
        navigate(t('/'));
    }

    useEffect(() => {
        setLoading(true);
        retrieveCurrentLessonUser(Number(lessonId), cookies[AUTH_COOKIE_NAME])
            .then((response) => {
                setLessonUser(response as LessonUser);
            })
            .catch((error) => {
                toast.error(t(error.message));
                navigate(t('/'));
            })
            .finally(() => {
                setLoading(false);
            });
    }, [lessonId, navigate, t]);
    return { lessonUser, loading };
};

export default useLessonUser;
