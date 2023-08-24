import { PhaseHeader } from "./PhaseHeader"
import { LessonIcon } from "./LessonIcon"


//TODO: Change this to the types and use the ones from the back
export interface LessonUser {
    lesson: number,
    user: number,
    percentage: number
}
export interface Lesson{
    id: number,
    color: string

}

export interface Phase {
    lessons: Lesson[],
    style: string,
    color: string,
    description: string,
    number: number
}

export interface IPhaseProps {
    phase: Phase
}



export function Phase({phase}:IPhaseProps){
    const {lessons, color, description, number} = phase
    return (
        <div className="py-6">
        <PhaseHeader phaseNumber={number} description={description} backgroundColor={color}/>
        {
            lessons.map(
                (lesson)=> <LessonIcon key={lesson.id} bgColor={lesson.color} lesson={lesson} />
            )
        }
        </div>
        
    )
}