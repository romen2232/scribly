import { useState, useEffect } from 'react';
import { TaskProps } from '../utils/types';

//this will be the task and [this the correct option] having other options\n\n [this is other option][this is other option 1][this is other option 2]

const TaskComplete = ({ task, onSubmit, onSkip }: TaskProps) => {
    const [sentenceParts, setSentenceParts] = useState<(string | null)[]>([]);
    const [options, setOptions] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    useEffect(() => {
        const regex = /\[(.*?)\]/g;
        const extractedOptions = task.text.match(regex) || [];
        setOptions(extractedOptions.map((opt) => opt.replace(/\[|\]/g, '')));
        const parts = task.text.split('\n\n')[0].split(regex);
        const processedParts = parts.map((part, index) => {
            if (index % 2 !== 0) {
                return null;
            }
            return part;
        });
        setSentenceParts(processedParts);
    }, [task.text]);

    const handleOptionChoice = (option: string) => {
        setSelectedOption(option);
        const newSentenceParts = sentenceParts.map((part) => {
            if (typeof part !== 'string') {
                return option;
            }
            return part;
        });
        setSentenceParts(newSentenceParts);
    };

    const handleAnswer = () => {
        const answer = {
            type: task.type,
            answerText: sentenceParts.join(''),
        };
        onSubmit(answer);
    };

    return (
        <>
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">{task.taskName}</h2>
                <p className="text-lg">{task.taskDescription}</p>

                <div className="border p-2">
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
                                selectedOption === option
                                    ? (setSelectedOption(null),
                                      setSentenceParts(
                                          sentenceParts.map((part) => {
                                              if (part === option) {
                                                  return null;
                                              }
                                              return part;
                                          }),
                                      ))
                                    : handleOptionChoice(option);
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <button
                    className={`w-1/2 rounded-xl border-2 p-4 ${
                        selectedOption === null
                            ? 'cursor-not-allowed bg-gray-500'
                            : 'bg-tiviElectricPurple-100'
                    }`}
                    {...(selectedOption === null && { disabled: true })}
                    onClick={handleAnswer}
                >
                    Submit
                </button>
                <button
                    className="w-1/2 rounded-xl border-2 bg-gray-500 p-4"
                    onClick={onSkip}
                >
                    Skip
                </button>
            </div>
        </>
    );
};

export default TaskComplete;
