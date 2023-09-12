import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { shuffleArray } from '../utils/functions';
import { Button } from './Button';
const TaskChoose = ({ task, onSubmit, onSkip }) => {
    const [text] = useState(shuffleArray(task.text.split('\n\n')));
    const [chosenAnswer, setChosenAnswer] = useState(-1);
    useEffect(() => {
        setChosenAnswer(-1);
    }, [task]);
    const handleAnswer = (index) => {
        //Put the chosen answer in the first position, and the others in the rest
        if (index === -1)
            return;
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
    return (_jsxs("div", { className: "relative flex h-full flex-col items-center justify-around gap-4", children: [_jsx("h2", { className: " mb-12 mt-16 w-8/12 text-center text-4xl font-bold", children: task.taskDescription }), _jsx("div", { className: "flex w-7/12 justify-between text-left text-xl", children: text.map((choice, index) => {
                    return (_jsx("button", { className: `w-5/12 rounded-xl ${chosenAnswer === index
                            ? 'border-4 border-primaryBlue-500 p-7'
                            : 'border-2 p-8'}`, onClick: () => chosenAnswer === index
                            ? setChosenAnswer(-1)
                            : setChosenAnswer(index), children: choice }, index));
                }) }), _jsx(Button, { className: `h-24 w-1/2 rounded-xl border-2 p-4 text-2xl font-bold text-white ${chosenAnswer === -1 ? 'bg-gray-500' : 'bg-primaryPink-100'}`, bgColor: chosenAnswer === -1 ? 'gray-500' : 'primaryPink-500', ...(chosenAnswer === -1 && { disabled: true }), onClick: () => handleAnswer(chosenAnswer), children: "Submit" }), _jsx(Button, { className: "absolute bottom-2 left-2 rounded-xl border-2 bg-zinc-800 p-4 font-bold text-secondaryYellow-500", bgColor: "zinc-800", onClick: handleSkip, children: "Skip" })] }));
};
export default TaskChoose;
