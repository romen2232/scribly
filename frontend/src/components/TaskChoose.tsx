import { useEffect, useState } from 'react';
import { TaskProps } from '../utils/types';
import { shuffleArray } from '../utils/functions';

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
        <div className="flex flex-col gap-4">
            <h2 className=" text-2xl font-bold">{task.taskDescription}</h2>
            <div className="flex justify-between gap-4">
                {text.map((choice, index) => {
                    return (
                        <button
                            key={index}
                            className={`w-1/2 rounded-xl ${
                                chosenAnswer === index
                                    ? 'border-4 border-tiviElectricPurple-100 p-3'
                                    : 'border-2 p-4'
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
            <button
                className={`w-1/2 rounded-xl border-2 p-4 ${
                    chosenAnswer === -1
                        ? 'bg-gray-500'
                        : 'bg-tiviElectricPurple-100'
                }`}
                {...(chosenAnswer === -1 && { disabled: true })}
                onClick={() => handleAnswer(chosenAnswer)}
            >
                Submit
            </button>
            <button
                className="w-1/2 rounded-xl border-2 bg-gray-500 p-4"
                onClick={handleSkip}
            >
                Skip
            </button>
        </div>
    );
};

export default TaskChoose;
