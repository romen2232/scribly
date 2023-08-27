import { create } from 'zustand';
import { AnswerProps, Note, Task, TaskUser } from '../utils/types';
import { parseCookies } from 'nookies';
import { partialUpdateTaskUserAnswer } from '../services/tasks';
import { AUTH_COOKIE_NAME } from '../utils/consts';

const cookies = parseCookies();

type LessonStore = {
    isTheoryEnd: boolean;
    currentIndex: number;
    currentTask: Task | null;
    writingNote: Note | null;
    skippedTask: boolean;
    currentTaskUser: TaskUser | null;
    tasks: Task[] | null;
    isModalOpen: boolean;

    setIsTheoryEnd: (value: boolean) => void;
    setCurrentIndex: (value: number) => void;
    setCurrentTask: (task: Task | null) => void;
    setWritingNote: (note: Note | null) => void;
    setSkippedTask: (value: boolean) => void;
    setCurrentTaskUser: (taskUser: TaskUser | null) => void;
    setTasks: (tasks: Task[] | null) => void;
    setIsModalOpen: (value: boolean) => void;

    handleSkipTask: (currentTask: Task) => Promise<void>;
    handleSubmitTask: (answer: AnswerProps, currentTask: Task) => Promise<void>;
};

/**
 * Zustand store for the lesson page.
 * @returns {LessonStore} The lesson store.
 * LessonStore is a Zustand store that contains the state and actions for the lesson page.
 * The state contains the following:
 * - isTheoryEnd: boolean - Whether the theory part of the lesson is over.
 * - currentIndex: number - The index of the current task.
 * - currentTask: Task | null - The current task.
 * - writingNote: Note | null - The note that the user is currently writing.
 * - skippedTask: boolean - Whether the user has skipped the current task.
 * - currentTaskUser: TaskUser | null - The current task user.
 * - tasks: Task[] | null - The tasks of the lesson.
 * - isModalOpen: boolean - Whether the modal is open.
 * The actions are the following:
 * - setIsTheoryEnd: (value: boolean) => void - Sets the isTheoryEnd state.
 * - setCurrentIndex: (value: number) => void - Sets the currentIndex state.
 * - setCurrentTask: (task: Task | null) => void - Sets the currentTask state.
 * - setWritingNote: (note: Note | null) => void - Sets the writingNote state.
 * - setSkippedTask: (value: boolean) => void - Sets the skippedTask state.
 * - setCurrentTaskUser: (taskUser: TaskUser | null) => void - Sets the currentTaskUser state.
 * - setTasks: (tasks: Task[] | null) => void - Sets the tasks state.
 * - setIsModalOpen: (value: boolean) => void - Sets the isModalOpen state.
 * - handleSkipTask: (currentTask: Task) => Promise<void> - Handles skipping the current task.
 * - handleSubmitTask: (answer: AnswerProps, currentTask: Task) => Promise<void> - Handles submitting the current task.
 */
export const useLessonStore = create<LessonStore>((set) => ({
    // State
    isTheoryEnd: false,
    currentIndex: 0,
    currentTask: null,
    writingNote: null,
    skippedTask: false,
    currentTaskUser: null,
    tasks: null,
    isModalOpen: false,

    // Updaters
    setIsTheoryEnd: (value) => set({ isTheoryEnd: value }),
    setCurrentIndex: (value) => set({ currentIndex: value }),
    setCurrentTask: (task) => set({ currentTask: task }),
    setWritingNote: (note) => set({ writingNote: note }),
    setSkippedTask: (value) => set({ skippedTask: value }),
    setCurrentTaskUser: (taskUser) => set({ currentTaskUser: taskUser }),
    setTasks: (tasks) => set({ tasks: tasks }),
    setIsModalOpen: (value) => set({ isModalOpen: value }),

    // Actions
    handleSkipTask: async (currentTask) => {
        try {
            await partialUpdateTaskUserAnswer(
                currentTask.id,
                { answerText: 'skipped' },
                cookies[AUTH_COOKIE_NAME],
            );
            set({ skippedTask: true });
            set({ isModalOpen: true });
        } catch (error) {
            console.error('Error skipping the task:', error);
        }
    },

    handleSubmitTask: async (answer, currentTask) => {
        set({ skippedTask: false });
        try {
            const response = await partialUpdateTaskUserAnswer(
                currentTask.id,
                answer,
                cookies[AUTH_COOKIE_NAME],
            );
            set({ currentTaskUser: response });
            set({ isModalOpen: true });
        } catch (error) {
            console.error('Error submitting the task:', error);
        }
    },
}));
