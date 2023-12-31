import { useState, useEffect } from 'react';
import { TaskProps } from '../utils/types';
import { shuffleArray } from '../utils/functions';
import { Button } from './Button';

//this will be the task and [this the correct option] having other options\n\n [this is other option][this is other option 1][this is other option 2]

//TODO: add animation with this as a reference: https://codepen.io/chadd/pen/mdPZrbP

const TaskComplete = ({ task, onSubmit, onSkip }: TaskProps) => {
    const [sentenceParts, setSentenceParts] = useState<(string | null)[]>([]);
    const [options, setOptions] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    //This useEffect extracts the options from the task text and sets them in the options state. It also extracts the sentence parts and sets them in the sentenceParts state.
    useEffect(() => {
        //this regex extracts the options from the task text. It matches anything between square brackets [].
        const regex = /\[(.*?)\]/g;
        const extractedOptions = task.text.match(regex) || [];
        //this removes the square brackets from the options and shuffles them
        const opt: string[] = shuffleArray(
            extractedOptions.map((opt) => opt.replace(/\[|\]/g, '')),
        );
        setOptions(opt);
        const parts = task.text.split('\n\n')[0].split(regex);
        const processedParts = parts.map((part, index) => {
            if (index % 2 !== 0) {
                return null;
            }
            return part;
        });
        setSentenceParts(processedParts);
    }, [task.text]);

    const handleOptionChoice = (
        option: string,
        updatedParts: (string | null)[],
    ) => {
        setSelectedOption(option);
        const newSentenceParts = updatedParts.map((part) => {
            if (typeof part !== 'string') {
                return option;
            }
            return part;
        });
        setSentenceParts(newSentenceParts);
    };

    //Reconstruct the sentence in the same format and submit it
    const handleAnswer = () => {
        const sentence = sentenceParts
            .map((part) => {
                if (part === selectedOption) {
                    return `[${part}]`;
                } else return part;
            })
            .join('');

        const answerText = `${sentence}\n\n${options
            .map((option) => `[${option}]`)
            .join('')}`;
        const answer = {
            answerText,
        };

        onSubmit(answer, task);
    };

    const handleSkip = () => {
        onSkip(task);
    };

    return (
        <>
            <div className="relative flex h-full flex-col items-center justify-around gap-4">
                {' '}
                <h2 className="mb-12 mt-16 w-8/12 text-center text-4xl font-bold">
                    {task.taskDescription}
                </h2>
                <div className="flex w-8/12 items-baseline justify-between border p-2 text-left text-xl">
                    {sentenceParts.map((part, index) => {
                        if (!part) {
                            return (
                                <span
                                    className="underline-space mx-2 inline-block w-40 border-b-2 border-dotted border-gray-800"
                                    key={index}
                                ></span>
                            );
                        }
                        return part;
                    })}
                </div>
                <div className="flex space-x-2">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            className={`rounded border p-2 hover:bg-blue-200 ${
                                selectedOption === option ? 'opacity-50' : ''
                            }`}
                            onClick={() => {
                                // If the clicked option is the currently selected option
                                if (selectedOption === option) {
                                    setSelectedOption(null);
                                    setSentenceParts((parts) =>
                                        parts.map((part) =>
                                            part === option ? null : part,
                                        ),
                                    );
                                } // If the clicked option is different from the currently selected option
                                else {
                                    const updatedParts = sentenceParts.map(
                                        (part) =>
                                            part === selectedOption
                                                ? null
                                                : part,
                                    );
                                    handleOptionChoice(option, updatedParts);
                                }
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <Button
                    className={`h-24 w-1/2 rounded-xl border-2 p-4 text-2xl font-bold text-white ${
                        selectedOption === null
                            ? 'bg-gray-500'
                            : 'bg-primaryPink-100'
                    }`}
                    bgColor={
                        selectedOption === null ? 'gray-500' : 'primaryPink-500'
                    }
                    {...(selectedOption === null && { disabled: true })}
                    onClick={handleAnswer}
                >
                    Submit
                </Button>
                <Button
                    className="absolute bottom-2 left-2 rounded-xl border-2 p-4 font-bold text-secondaryYellow-500"
                    bgColor="zinc-800"
                    onClick={handleSkip}
                >
                    Skip
                </Button>
            </div>
        </>
    );
};

export default TaskComplete;
