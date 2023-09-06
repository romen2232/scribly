import { useEffect } from 'react';
import Loader from './loader';
import LessonTheory from '../components/LessonTheory';
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
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { createNote } from '../services/notes';
import { useLessonStore } from '../stores/lessonStore';

//TODO: Is completed and the update of the task user

//TODO: Somehow figure out how to check if the task user is completed

const Lesson = () => {
    const {
        isTheoryEnd,
        setIsTheoryEnd,
        currentIndex,
        setCurrentIndex,
        currentTask,
        setCurrentTask,
        writingNote,
        setWritingNote,
        skippedTask,
        setSkippedTask,
        tasks,
        setTasks,
        currentTaskUser,
        isModalOpen,
        setIsModalOpen,
        handleSkipTask,
        handleSubmitTask,
    } = useLessonStore();
    const { lessonId } = useParams();
    const { lessonUser, loading } = useLessonUser(lessonId || '');
    const { t } = useTranslation();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const cookies = parseCookies();
    const navigate = useNavigate();

    // useEffect for opening the modal
    useEffect(() => {
        if (isModalOpen) {
            onOpen();
        }
    }, [isModalOpen]);

    // useEffect for closing the modal in the store
    useEffect(() => {
        if (!isOpen) {
            setIsModalOpen(false);
        }
    }, [isOpen]);

    // useEffect for updating the tasks array
    useEffect(() => {
        if (lessonUser) {
            setTasks(lessonUser.taskUser.map((tu) => tu.task));
        }
    }, [lessonUser]);

    // useEffect for updating the current task
    useEffect(() => {
        if (tasks) {
            setCurrentTask(tasks[currentIndex]);
        }
    }, [tasks, currentIndex]);

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
    const handleTheoryEnd = () => setIsTheoryEnd(!isTheoryEnd);

    const goToNextTask = async () => {
        if (!tasks) return;
        const nextIndex = currentIndex + 1;
        if (nextIndex < tasks.length) {
            setCurrentIndex(nextIndex);
            setSkippedTask(false);
        } else {
            // TODO: Make page for when the lesson is completed
            navigate(t('/finishLesson'));
        }
    };

    if (!lessonUser || loading) {
        return <Loader />;
    }

    const renderTask = () => {
        if (!currentTask) return null;
        const taskProps = {
            task: currentTask,
            onSubmit: handleSubmitTask,
            onSkip: handleSkipTask,
        };
        switch (currentTask.type) {
            case 'CHOOSE':
                return <TaskChoose {...taskProps} />;
            case 'COMPLETE':
                return <TaskComplete {...taskProps} />;
            case 'WRITE':
                return (
                    writingNote && (
                        <TaskWrite {...taskProps} initialNote={writingNote} />
                    )
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {!isTheoryEnd ? (
                <LessonTheory
                    theory={lessonUser.lesson.lessonTheory}
                    onEnd={handleTheoryEnd}
                />
            ) : (
                <div className="tasks" key={currentTask?.id}>
                    {renderTask()}
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
