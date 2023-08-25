import { useEffect, useState } from 'react';
import Loader from './loader';
import LessonTheory from '../components/LessonTheory';
import { AnswerProps, Note, Task, TaskUser } from '../utils/types';
import TaskChoose from '../components/TaskChoose';
import TaskComplete from '../components/TaskComplete';
import TaskWrite from '../components/TaskWrite';
import useLessonUser from '../hooks/useLessonUser';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { partialUpdateTaskUserAnswer } from '../services/tasks';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { createNote } from '../services/notes';

//TODO: Is completed and the update of the task user

//TODO: Somehow figure out how to check if the task user is completed

const Lesson = () => {
    const { lessonId } = useParams();

    const { lessonUser, loading } = useLessonUser(lessonId ?? '');

    const tasks = lessonUser?.taskUser.map((taskUser) => taskUser.task);

    const { t } = useTranslation();

    const [isTheoryEnd, setIsTheoryEnd] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentTask, setCurrentTask] = useState<Task | null>(
        tasks ? tasks[0] : null,
    );
    const [writingNote, setWritingNote] = useState<Note>();
    const [skippedTask, setSkippedTask] = useState<boolean>(false);
    const [currentTaskUser, setCurrentTaskUser] = useState<TaskUser | null>();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const cookies = parseCookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (tasks) {
            setCurrentTask(tasks[0]);
        }
    }, [tasks]);
    // useEffect for updating currentTask
    useEffect(() => {
        if (!tasks) return;
        setCurrentTask(tasks[currentIndex]);
    }, [currentIndex, tasks]);

    // useEffect for creating a note
    //The isMounted variable is used to prevent a memory leak
    useEffect(() => {
        let isMounted = true;

        if (currentTask?.type === 'WRITE') {
            createNote(
                {
                    noteName: currentTask.taskName,
                    noteContent: '',
                },
                cookies[AUTH_COOKIE_NAME],
            ).then((note) => {
                if (isMounted) {
                    setWritingNote(note);
                }
            });
        }

        return () => {
            isMounted = false;
        };
    }, [currentTask]);

    // When the theory ends, the first task is shown
    const handleTheoryEnd = () => {
        setIsTheoryEnd(!isTheoryEnd);
    };

    // When the user skips a task, the next one is shown and the task user is updated with the skipped task
    const handleSkipTask = async () => {
        if (currentTask && lessonUser) {
            try {
                // Update the backend to reflect that the task was skipped
                await partialUpdateTaskUserAnswer(
                    currentTask.id,
                    {
                        answerText: 'skipped',
                    },
                    cookies[AUTH_COOKIE_NAME],
                );

                // Update the UI
                setSkippedTask(true);
                onOpen();
            } catch (error) {
                console.error('Error skipping the task:', error);
            }
        }
    };

    const goToNextTask = async () => {
        if (!tasks) return;
        const nextIndex = currentIndex + 1;
        if (nextIndex < tasks.length) {
            setCurrentIndex(nextIndex);
            setSkippedTask(false);
        } else {
            // TODO: Make page for when the lesson is completed
            navigate(t('/'));
        }
    };

    const handleSubmitTask = async (answer: AnswerProps) => {
        if (currentTask && lessonUser) {
            setSkippedTask(false);
            try {
                // Update the backend with the user's answer and get the result
                const response = await partialUpdateTaskUserAnswer(
                    currentTask.id,
                    answer,
                    cookies[AUTH_COOKIE_NAME],
                );

                // Update `currentTaskUser` state with the response data
                setCurrentTaskUser(response);

                // Open the feedback modal
                onOpen();
            } catch (error) {
                console.error('Error submitting the task:', error);
            }
        }
    };

    if (!lessonUser || loading) {
        return <Loader />;
    }

    return (
        <div>
            {!isTheoryEnd ? (
                <LessonTheory
                    theory={lessonUser.lesson.lessonTheory}
                    onEnd={handleTheoryEnd}
                />
            ) : (
                <div className="tasks">
                    {currentTask && (
                        <>
                            {currentTask.type === 'CHOOSE' && (
                                <TaskChoose
                                    task={currentTask}
                                    onSubmit={handleSubmitTask}
                                    onSkip={handleSkipTask}
                                />
                            )}
                            {currentTask.type === 'COMPLETE' && (
                                <TaskComplete
                                    task={currentTask}
                                    onSubmit={handleSubmitTask}
                                    onSkip={handleSkipTask}
                                />
                            )}
                            {currentTask.type === 'WRITE' && writingNote && (
                                <TaskWrite
                                    task={currentTask}
                                    onSubmit={handleSubmitTask}
                                    onSkip={handleSkipTask}
                                    initialNote={writingNote}
                                />
                            )}
                            {/* {currentTask.type === 'REORDER' && (
                                <TaskReorder
                                    task={currentTask}
                                    onSubmit={handleSubmitTask}
                                    onSkip={handleSkipTask}
                                />
                            )}*/}
                        </>
                    )}
                </div>
            )}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop={skippedTask ? 'opaque' : 'transparent'}
                placement="bottom"
                classNames={{
                    header:
                        currentTaskUser?.answerBoolean && !skippedTask
                            ? 'bg-green-500'
                            : 'bg-red-500',
                    closeButton: 'text-black',
                }}
            >
                <ModalContent>
                    {(onClose) => {
                        return (
                            <>
                                <ModalHeader>
                                    {skippedTask
                                        ? t('task.Skip')
                                        : currentTaskUser?.answerBoolean
                                        ? t('task.Correct')
                                        : t('task.Incorrect')}
                                </ModalHeader>
                                <ModalBody>
                                    {skippedTask ? (
                                        <>
                                            {t('task.SkipText')}
                                            <br />
                                            {t('task.NoPoints')}
                                        </>
                                    ) : (
                                        currentTaskUser?.responseText
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <button
                                        className={`rounded-xl
                                             p-4 font-semibold hover:shadow-[0px_0px_5px_rgba(0,0,0,0.35)]
                                         ${
                                             skippedTask ||
                                             !currentTaskUser?.answerBoolean
                                                 ? 'text-tiviElectricViolet'
                                                 : 'bg-tiviElectricPurple-50'
                                         }`}
                                    >
                                        {currentTaskUser?.answerBoolean
                                            ? t('task.Review')
                                            : t('task.Retry')}
                                    </button>
                                    <button
                                        className={`rounded-xl  p-4 font-bold hover:shadow-[0px_0px_5px_rgba(0,0,0,0.35)] ${
                                            skippedTask ||
                                            !currentTaskUser?.answerBoolean
                                                ? 'bg-gray-300 hover:bg-red-500'
                                                : 'bg-tiviElectricPurple-100'
                                        }`}
                                        onClick={() => {
                                            onClose();
                                            goToNextTask();
                                        }}
                                    >
                                        {skippedTask
                                            ? t('task.SkipNext')
                                            : t('task.Next')}
                                    </button>
                                </ModalFooter>
                            </>
                        );
                    }}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Lesson;
