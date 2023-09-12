import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Loader from './loader';
import LessonTheory from '../components/LessonTheory';
import TaskChoose from '../components/TaskChoose';
import TaskComplete from '../components/TaskComplete';
import TaskWrite from '../components/TaskWrite';
import useLessonUser from '../hooks/useLessonUser';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import { createNote } from '../services/notes';
import { useLessonStore } from '../stores/lessonStore';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
//TODO: Is completed and the update of the task user
//TODO: Somehow figure out how to check if the task user is completed
const Lesson = () => {
    const { isTheoryEnd, setIsTheoryEnd, currentIndex, setCurrentIndex, currentTask, setCurrentTask, writingNote, setWritingNote, skippedTask, setSkippedTask, tasks, setTasks, currentTaskUser, isModalOpen, setIsModalOpen, handleSkipTask, handleSubmitTask, } = useLessonStore();
    const { lessonId } = useParams();
    const { lessonUser, loading } = useLessonUser(lessonId || '');
    const { t } = useTranslation();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const cookies = parseCookies();
    const navigate = useNavigate();
    const [isFinished, setIsFinished] = useState(false);
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
            createNote({
                noteName: currentTask.taskName,
                noteContent: '',
            }, cookies[AUTH_COOKIE_NAME]).then((note) => {
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
        if (!tasks)
            return;
        const nextIndex = currentIndex + 1;
        if (nextIndex < tasks.length) {
            setCurrentIndex(nextIndex);
            setSkippedTask(false);
        }
        else {
            setIsFinished(true);
            onOpen();
        }
    };
    if (!lessonUser || loading) {
        return _jsx(Loader, {});
    }
    const renderTask = () => {
        if (!currentTask)
            return null;
        const taskProps = {
            task: currentTask,
            onSubmit: handleSubmitTask,
            onSkip: handleSkipTask,
        };
        switch (currentTask.type) {
            case 'CHOOSE':
                return _jsx(TaskChoose, { ...taskProps });
            case 'COMPLETE':
                return _jsx(TaskComplete, { ...taskProps });
            case 'WRITE':
                return (writingNote && (_jsx(TaskWrite, { ...taskProps, initialNote: writingNote })));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "flex h-full flex-col", children: [_jsx(Header, {}), !isTheoryEnd ? (_jsx(LessonTheory, { theory: lessonUser.lesson.lessonTheory, onEnd: handleTheoryEnd })) : (_jsx("div", { className: "tasks h-full", children: renderTask() }, currentTask?.id)), _jsx(Modal, { isOpen: isOpen, onOpenChange: onOpenChange, backdrop: skippedTask ? 'opaque' : 'transparent', placement: "bottom", classNames: {
                    header: currentTaskUser?.answerBoolean && !skippedTask
                        ? 'bg-green-400'
                        : 'bg-red-400',
                    closeButton: 'text-black',
                }, children: _jsx(ModalContent, { className: "bg-mainBackground-200", children: (onClose) => {
                        return (_jsxs(_Fragment, { children: [_jsx(ModalHeader, { children: isFinished ? t('task.Finished') :
                                        skippedTask
                                            ? t('task.Skip')
                                            : currentTaskUser?.answerBoolean
                                                ? t('task.Correct')
                                                : t('task.Incorrect') }), _jsx(ModalBody, { children: isFinished ? t('task.FinishedText') :
                                        skippedTask ? (_jsxs(_Fragment, { children: ["/api/v1/lessons/import/        ", t('task.SkipText'), _jsx("br", {}), t('task.NoPoints')] })) : (currentTaskUser?.responseText) }), _jsx(ModalFooter, { children: isFinished ? (_jsx(Button, { className: `rounded-xl  p-4 font-bold hover:shadow-[0px_0px_5px_rgba(0,0,0,0.35)] text-white
                                        `, bgColor: 'bg-primaryBlue-500', onClick: () => {
                                            onClose();
                                            navigate('/');
                                        }, children: t('task.GoHome') })) : (_jsxs(_Fragment, { children: [_jsx(Button, { className: `rounded-xl
                                        p-4 font-semibold hover:shadow-[0px_0px_5px_rgba(0,0,0,0.35)]
                                        `, bgColor: skippedTask ||
                                                    !currentTaskUser?.answerBoolean
                                                    ? 'primaryPink-500'
                                                    : 'primaryBlue-50', onClick: () => {
                                                    onClose();
                                                }, children: currentTaskUser?.answerBoolean
                                                    ? t('task.Review')
                                                    : t('task.Retry') }), _jsx(Button, { className: `rounded-xl  p-4 font-bold hover:shadow-[0px_0px_5px_rgba(0,0,0,0.35)] ${skippedTask ||
                                                    !currentTaskUser?.answerBoolean
                                                    ? ''
                                                    : 'text-white'}
                                        `, bgColor: skippedTask ||
                                                    !currentTaskUser?.answerBoolean
                                                    ? 'bg-gray-300'
                                                    : 'bg-primaryBlue-500', onClick: () => {
                                                    onClose();
                                                    goToNextTask();
                                                }, children: skippedTask
                                                    ? t('task.SkipNext')
                                                    : t('task.Next') })] })) })] }));
                    } }) })] }));
};
export default Lesson;
