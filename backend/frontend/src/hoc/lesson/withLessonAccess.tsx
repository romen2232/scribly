import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../../utils/consts';
import Loader from '../../pages/loader';
import { retrieveCurrentLessonUser as getLessonUser } from '../../services/lesson';
import { LessonUser, Lesson } from '../../utils/types';

interface WithLessonAccessProps {
    lessonId: number;
    lessonUser?: LessonUser | null;
}

const withLessonAccess = (
    WrappedComponent: React.ComponentType<WithLessonAccessProps>,
) => {
    const WithAccess = (props: WithLessonAccessProps) => {
        const [canAccess, setCanAccess] = useState<boolean>(false);
        const [lessonUser, setLessonUser] = useState<LessonUser | null>(null);
        const navigate = useNavigate();
        const cookies = parseCookies();

        useEffect(() => {
            const { lessonId } = props;

            async function checkAccess() {
                const lessonUserData = await getLessonUser(
                    lessonId,
                    cookies[AUTH_COOKIE_NAME],
                );

                if (!lessonUserData) {
                    setCanAccess(false);
                    return;
                }

                setLessonUser(lessonUserData);

                const lesson = lessonUserData.lesson;

                const currentLessonIndex =
                    lesson.unit?.lessons.findIndex(
                        (l: Lesson) => l.id === lesson.id,
                    ) ?? 0;
                if (currentLessonIndex > 0) {
                    const prevLesson =
                        lesson.unit?.lessons[currentLessonIndex - 1];
                    const prevLessonUserData = await getLessonUser(
                        prevLesson?.id ?? 0,
                        cookies[AUTH_COOKIE_NAME],
                    );

                    if (
                        prevLessonUserData &&
                        prevLessonUserData.percentageCompleted === 100
                    ) {
                        setCanAccess(true);
                    } else {
                        setCanAccess(false);
                    }
                } else {
                    // If it's the first lesson, then the user can access it.
                    setCanAccess(true);
                }
            }

            checkAccess();
        }, [props]);

        if (canAccess === false) {
            navigate('/'); // Redirect to homepage
            return null;
        }

        if (canAccess === null) {
            return <Loader />;
        }

        return <WrappedComponent {...props} lessonUser={lessonUser} />;
    };

    WithAccess.displayName = `WithAccess(${getDisplayName(WrappedComponent)})`;

    return WithAccess;
};

export default withLessonAccess;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDisplayName(WrappedComponent: React.ComponentType<any>): string {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
