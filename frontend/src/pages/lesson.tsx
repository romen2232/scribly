import {useEffect, useState} from "react";
import Loader from "./loader";
import LessonTheory from "../components/LessonTheory";

export interface ILessonProps{
    lessonId: number
    lessonUser: LessonUser | null
}




const Lesson: React.FC<ILessonProps> = ({lessonUser}) => {

    const [isTheoryEnd, setIsTheoryEnd] = useState<boolean>(false);

    const handleTheoryEnd = () => {
        setIsTheoryEnd(!isTheoryEnd);
    }
    if(!lessonUser){
        return <Loader/>
    }

    return (
        <div>
          {!isTheoryEnd ? (
            <LessonTheory
              theory={lessonUser.lesson.lessonTheory}
              onEnd={handleTheoryEnd}
            />
          ) : (
            <div className="tasks">
                {lessonUser.tasksUser.map(taskUser => {
                    switch(taskUser.task.type) {
                        case 'WRITE':
                        case 'COMPLETE':
                        case 'REORDER':
                        case 'CHOOSE':
                        default:
                        return null;  // or a default/fallback component
                    }
                })}
            </div>
          )}
        </div>
      );
    };
}