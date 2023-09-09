import { useEffect, useState } from 'react';
import { TaskProps } from '../utils/types';
import { shuffleArray } from '../utils/functions';
import { Button } from './Button';

const TaskChoose: React.FC<TaskProps> = ({ task, onSubmit, onSkip }) => {
    const [text] = useState<string[]>(shuffleArray(task.text.split('\n\n')));
    const [chosenAnswer, setChosenAnswer] = useState<number>(-1);

    useEffect(() => {
        setChosenAnswer(-1);
    }, [task]);

    const handleAnswer = (index: number) => {
        //Put the chosen answer in the first position, and the others in the rest
        if (index === -1) return;
        const newText = [...text];
        const answerText = newText[index];
        newText.splice(index, 1);
        newText.unshift(answerText);

        const answer = {
            answerText: newText.join('\n\n'),
        };
        onSubmit(answer, task);
    };

    const handleSkip = () => {
        onSkip(task);
    };

    return (
        <div className="relative flex h-full flex-col items-center justify-around gap-4">
            <h2 className=" mb-12 mt-16 w-8/12 text-center text-4xl font-bold">
                {task.taskDescription}
            </h2>
            <div className="flex w-7/12 justify-between text-left text-xl">
                {text.map((choice, index) => {
                    return (
                        <button
                            key={index}
                            className={`w-5/12 rounded-xl ${
                                chosenAnswer === index
                                    ? 'border-4 border-primaryBlue-500 p-7'
                                    : 'border-2 p-8'
                            }`}
                            onClick={() =>
                                chosenAnswer === index
                                    ? setChosenAnswer(-1)
                                    : setChosenAnswer(index)
                            }
                        >
                            {choice}
                        </button>
                    );
                })}
            </div>
            <Button
                className={`h-24 w-1/2 rounded-xl border-2 p-4 text-2xl font-bold text-white ${
                    chosenAnswer === -1 ? 'bg-gray-500' : 'bg-primaryPink-100'
                }`}
                bgColor={chosenAnswer === -1 ? 'gray-500' : 'primaryPink-500'}
                {...(chosenAnswer === -1 && { disabled: true })}
                onClick={() => handleAnswer(chosenAnswer)}
            >
                Submit
            </Button>
            <Button
                className="absolute bottom-2 left-2 rounded-xl border-2 bg-zinc-800 p-4 font-bold text-secondaryYellow-500"
                bgColor="zinc-800"
                onClick={handleSkip}
            >
                Skip
                <h2 className="text-2xl font-bold">{task.taskName}</h2>
            </Button>
        </div>
    );
};

export default TaskChoose;
