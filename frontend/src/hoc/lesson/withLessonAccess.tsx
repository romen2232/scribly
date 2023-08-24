import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseCookies } from "nookies";
import { AUTH_COOKIE_NAME } from "../../utils/consts";
import Loader from "../../pages/loader";

  type Lesson = {
    id: number;
    name: string;
    unit: Unit;
    // ...other properties
  };
  
  type Unit = {
    id: number;
    lessons: Lesson[];
    // ...other properties
  };

  type LessonUser = {
    lesson: number;
    user: number;
    percentage: number;
  }

  interface WithLessonAccessProps {
    lessonId: number
    lessonUser?: LessonUser | null
  }
//TODO: Change get lesson user



const withLessonAccess = (WrappedComponent: React.ComponentType<WithLessonAccessProps>) => {
  return (props: WithLessonAccessProps) => {
    const [canAccess, setCanAccess] = useState<boolean>(false);
    const [lessonUser, setLessonUser] = useState<LessonUser | null>(null);
    const navigate = useNavigate();
    const cookies = parseCookies();

    useEffect(() => {
      const { lessonId } = props;

      async function checkAccess() {
        const lessonUserData = await getLessonUser(lessonId, cookies[AUTH_COOKIE_NAME]);

        if (!lessonUserData) {
          setCanAccess(false);
          return;
        }

        setLessonUser(lessonUserData);

        const lesson = lessonUserData.lesson;

        const currentLessonIndex = lesson.unit.lessons.findIndex((l:Lesson) => l.id === lesson.id);
        if (currentLessonIndex > 0) {
          const prevLesson = lesson.unit.lessons[currentLessonIndex - 1];
          const prevLessonUserData = await getLessonUser(prevLesson.id, cookies[AUTH_COOKIE_NAME]);
          
          if (prevLessonUserData && prevLessonUserData.percentage === 100) {
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
};

export default withLessonAccess;
