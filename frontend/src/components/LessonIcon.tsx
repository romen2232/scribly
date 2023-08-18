import { button } from '@nextui-org/react';
import { t } from 'i18next';
import {SiKnowledgebase} from 'react-icons/si'
import { Link } from 'react-router-dom';

export interface ILessonIconProps {
    bgColor?: string;
    classNameProp?: string;
    lesson: Lesson;
    }

export function LessonIcon(
    {classNameProp, bgColor, lesson}: ILessonIconProps
){
    
    bgColor='bg-tiviElectricPurple-50'

    const bgNumber: number = +bgColor?.split('-')[2]
    const shadowNumber = bgNumber+100
    const tailBgColor = bgColor || 'bg-tiviElectricPurple-50'
    const tailShadowColor = bgColor.split('-').slice(0,2).join('-')+'-'+shadowNumber || 'bg-tiviElectricPurple-100'

    return (
        <Link to={t('/lesson')+'/'+lesson.id} className={['shadow-inner-lg  p-6 rounded-full active:translate-y-1.5 active:shadow-none', classNameProp, tailBgColor, tailShadowColor].join(' ')}>
            <SiKnowledgebase/>
        </Link>
      );
}