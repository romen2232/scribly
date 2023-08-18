import { useState, useEffect } from "react";

export interface ITaskChooseProps {
    task: Task;
    onCorrect: () => void;
    onWrong: () => void;
}

const TaskChoose: React.FC<ITaskChooseProps> = ({ task, onCorrect, onWrong }) => {
    const [text, setText] = useState<string[]>([]);
    useEffect(() => {
        setText([...task.text].sort(() => Math.random() - 0.5));
    }, [task]);

    const handleChoice = (choice: string) => {
        if (choice === task.text[0]) {
            onCorrect();
        } else {
            onWrong();
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className=" font-bold text-2xl">{task.description}</h2>
            <div className="flex gap-4 justify-between">
                {text.map((choice, index) => (
                    // As a card
                    <button key={index} className="p-4 border-2 rounded-xl w-5/12"
                     onClick={() => handleChoice(choice)}>
                        {choice}
                    </button>
                ))}
            </div>
        </div>
    );
}