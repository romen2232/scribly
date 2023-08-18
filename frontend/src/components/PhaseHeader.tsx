import { t } from "i18next";
import {MdOutlinePlayLesson} from 'react-icons/md'
import { Link } from "react-router-dom";

export interface IPhaseHeaderProps {
    phaseNumber: number;
    description: string;
    backgroundColor: string;
}

export function PhaseHeader({phaseNumber, description, backgroundColor}: IPhaseHeaderProps){
   return (
    <article
    className={["max-w-2xl text-black rounded-xl", backgroundColor].join(
      " "
    )}
  >
    <header className="flex items-center justify-between w-96 p-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">{t('lessons.Units')+' '+phaseNumber}</h2>
        <p className="text-lg">{description}</p>
      </div>
      {/* TODO: link to the current lesson */}
        <Link to="" className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black">
            <MdOutlinePlayLesson size={32}/>
        </Link>

    </header>
  </article>
    )
}
