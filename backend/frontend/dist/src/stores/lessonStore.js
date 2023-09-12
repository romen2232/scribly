import { create } from 'zustand';
import { parseCookies } from 'nookies';
import { partialUpdateTaskUserAnswer } from '../services/tasks';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import confetti from 'canvas-confetti';
const cookies = parseCookies();
/**
 * Zustand store for the lesson page.
 * LessonStore is a Zustand store that contains the state and actions for the lesson page.
 * The state contains the following:
 * @returns {LessonStore} The state and actions for the lesson page.
 */
export const useLessonStore = create((set) => ({
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
            const response = await partialUpdateTaskUserAnswer(currentTask.id, { answerText: 'skipped' }, cookies[AUTH_COOKIE_NAME]);
            set({ currentTaskUser: response });
            set({ skippedTask: true });
            set({ isModalOpen: true });
        }
        catch (error) {
            console.error('Error skipping the task:', error);
        }
    },
    handleSubmitTask: async (answer, currentTask) => {
        set({ skippedTask: false });
        try {
            const response = await partialUpdateTaskUserAnswer(currentTask.id, answer, cookies[AUTH_COOKIE_NAME]);
            set({ currentTaskUser: response });
            set({ isModalOpen: true });
            if (response.answerBoolean) {
                confetti();
            }
        }
        catch (error) {
            console.error('Error submitting the task:', error);
        }
    },
}));
