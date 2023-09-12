import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Note } from './Note';
import { Button } from './Button';
const TaskWrite = ({ task, onSubmit, initialNote }) => {
    const [currentNote, setCurrentNote] = useState(initialNote);
    const handleNoteChange = (updatedNote) => {
        setCurrentNote(updatedNote);
    };
    const handleAnswer = async () => {
        const answerText = currentNote.noteContent ?? '';
        // Verificar la longitud del contenido
        if (answerText.length > 100) {
            // Suponiendo que 1000 caracteres es el límite
            alert(answerText.slice(0, 100)); // Mostrar la primera parte
            alert(answerText.slice(100)); // Mostrar la segunda parte
        }
        else {
            alert(answerText); // Mostrar el contenido completo
        }
        const answer = {
            answerText: answerText,
            answerNote: currentNote.id,
        };
        onSubmit(answer, task);
    };
    return (_jsxs("div", { className: "relative flex h-full flex-col items-center justify-around gap-4", children: [_jsx("div", { children: _jsx(Note, { note: initialNote, onNoteChange: handleNoteChange }) }), _jsx(Button, { className: `h-24 w-1/2 rounded-xl border-2 bg-primaryBlue-500 p-4 text-2xl font-bold text-white`, bgColor: 'primaryBlue-500', onClick: () => handleAnswer(), children: "Submit" })] }));
};
export default TaskWrite;
