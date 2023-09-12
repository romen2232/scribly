import { useState } from 'react';
import { TaskProps } from '../utils/types';
import { Note } from './Note';
import { Note as NoteType } from '../utils/types';

import { Button } from './Button';

interface TaskWriteProps extends TaskProps {
    initialNote: NoteType;
}

const TaskWrite = ({ task, onSubmit, initialNote }: TaskWriteProps) => {
    const [currentNote, setCurrentNote] = useState<NoteType>(initialNote);

    const handleNoteChange = (updatedNote: NoteType) => {
        setCurrentNote(updatedNote);
    };

    const handleAnswer = async () => {
        const answerText = currentNote.noteContent ?? '';

        // Verificar la longitud del contenido
        if (answerText.length > 100) {
            // Suponiendo que 1000 caracteres es el límite
            alert(answerText.slice(0, 100)); // Mostrar la primera parte
            alert(answerText.slice(100)); // Mostrar la segunda parte
        } else {
            alert(answerText); // Mostrar el contenido completo
        }

        const answer = {
            answerText: answerText,
            answerNote: currentNote.id,
        };

        onSubmit(answer, task);
    };

    return (
        <div className="relative flex h-full flex-col items-center justify-around gap-4">
            <p>
                {task.taskDescription}
            </p>
                {/* Render the Note component for writing the task */}
                <Note note={initialNote} onNoteChange={handleNoteChange} />

            <Button
                className={`h-24 w-1/2 rounded-xl border-2 bg-primaryBlue-500 p-4 text-2xl font-bold text-white`}
                bgColor={'primaryBlue-500'}
                onClick={() => handleAnswer()}
            >
                Submit
            </Button>
        </div>
    );
};

export default TaskWrite;
