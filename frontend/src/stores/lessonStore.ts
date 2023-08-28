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
 * LessonStore is a Zustand store that contains the state and actions for the lesson page.
 * The state contains the following:
 * @returns {LessonStore} The state and actions for the lesson page.
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
            const response = await partialUpdateTaskUserAnswer(
                currentTask.id,
                { answerText: 'skipped' },
                cookies[AUTH_COOKIE_NAME],
            );
            set({ currentTaskUser: response });
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
