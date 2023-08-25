import { apiClient } from './api';

import { Task, TaskUser } from '../utils/types';

/** Fetches all tasks from the API
 * @param token JWT token
 * @returns List of tasks
 * @throws Error if fetching tasks fails
 */
const listTasks = async (token: string): Promise<Task[]> => {
    try {
        const response = await apiClient.get<Task[]>('/api/v1/tasks/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error listing tasks: ${error}`);
    }
};

/** Fetches a specific task from the API
 * @param taskId Task ID
 * @param token JWT token
 * @returns Task
 * @throws Error if fetching the specific task fails
 */
const retrieveTask = async (taskId: number, token: string): Promise<Task> => {
    try {
        const response = await apiClient.get<Task>(`/api/v1/task/${taskId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving task: ${error}`);
    }
};

/** Creates a task
 * @param task Task object
 * @param token JWT token
 * @returns Task
 * @throws Error if creating task fails
 * */
const createTask = async (task: Task, token: string): Promise<Task> => {
    try {
        const response = await apiClient.post<Task>(`/api/v1/tasks/`, task, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error creating task: ${error}`);
    }
};

/** Updates a task
 * @param task Task object
 * @param token JWT token
 * @returns Task
 * @throws Error if updating task fails
 * */
const updateTask = async (task: Task, token: string): Promise<Task> => {
    try {
        const response = await apiClient.put<Task>(
            `/api/v1/task/${task.id}/`,
            task,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error updating task: ${error}`);
    }
};

/** Partially updates a task
 * @param taskId Task ID
 * @param task Task object
 * @param token JWT token
 * @returns Task
 * @throws Error if partially updating task fails
 * */
const partialUpdateTask = async (
    taskId: number,
    task: Partial<Task>,
    token: string,
): Promise<Task> => {
    try {
        const response = await apiClient.patch<Task>(
            `/api/v1/task/${taskId}/`,
            task,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error partially updating task: ${error}`);
    }
};

/** Deletes a task
 * @param taskId Task ID
 * @param token JWT token
 * @returns Task
 * @throws Error if deleting task fails
 * */
const deleteTask = async (taskId: number, token: string): Promise<Task> => {
    try {
        const response = await apiClient.delete<Task>(
            `/api/v1/task/${taskId}/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting task: ${error}`);
    }
};

/** Fetches a TaskUser relationship from the API for the logged in user
 * @param taskId Task ID
 * @param token JWT token
 * @returns TaskUser
 * @throws Error if fetching the TaskUser relationship fails
 * */
const retrieveTaskUser = async (
    taskId: number,
    token: string,
): Promise<TaskUser> => {
    try {
        const response = await apiClient.get<TaskUser>(
            `/api/v1/task/${taskId}/user/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error retrieving task user: ${error}`);
    }
};

/** Creates a TaskUser relationship for the logged in user
 * @param taskId Task ID
 * @param lessonUserId LessonUser ID
 * @param token JWT token
 * @returns TaskUser
 * @throws Error if creating the TaskUser relationship fails
 * TODO: This is not used anywhere and does not work as intended but is kept for future use
 * */
const createTaskUser = async (
    taskId: number,
    lessonUserId: number,
    token: string,
): Promise<TaskUser> => {
    try {
        const response = await apiClient.post<TaskUser>(
            `/api/v1/task/user/`,
            {
                task: taskId,
                lesson_user: lessonUserId,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error creating task user: ${error}`);
    }
};

/** Updates a TaskUser relationship for the logged in user
 * @param taskUser TaskUser object
 * @param token JWT token
 * @returns TaskUser
 * @throws Error if updating the TaskUser relationship fails
 * */
const updateTaskUser = async (
    taskUser: TaskUser,
    token: string,
): Promise<TaskUser> => {
    try {
        const response = await apiClient.put<TaskUser>(
            `/api/v1/task/${taskUser.task.id}/user/`,
            taskUser,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error updating task user: ${error}`);
    }
};

/** Partially updates a TaskUser relationship for the logged in user
 * @param taskId Task ID
 * @param taskUser TaskUser object
 * @param token JWT token
 * @returns TaskUser
 * @throws Error if partially updating the TaskUser relationship fails
 * */
const partialUpdateTaskUser = async (
    taskId: number,
    taskUser: Partial<TaskUser>,
    token: string,
): Promise<TaskUser> => {
    try {
        const response = await apiClient.patch<TaskUser>(
            `/api/v1/task/${taskId}/user/`,
            taskUser,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error partially updating task user: ${error}`);
    }
};

/** Function to partial update a TaskUser relationship for the logged in user with the answer updated
 * @param taskId Task ID
 * @param answer Answer
 * @param token JWT token
 * @returns TaskUser
 * @throws Error if partially updating the TaskUser relationship fails
 *  */
const partialUpdateTaskUserAnswer = async (
    taskId: number,
    answer: Partial<TaskUser>,
    token: string,
): Promise<TaskUser> => {
    try {
        const response = await apiClient.patch<TaskUser>(
            `/api/v1/task/answer/${taskId}/user/`,
            answer,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error partially updating task user: ${error}`);
    }
};

/** Deletes a TaskUser relationship for the logged in user
 * @param taskId Task ID
 * @param token JWT token
 * @returns TaskUser
 * @throws Error if deleting the TaskUser relationship fails
 * */
const deleteTaskUser = async (
    taskId: number,
    token: string,
): Promise<TaskUser> => {
    try {
        const response = await apiClient.delete<TaskUser>(
            `/api/v1/task/${taskId}/user/`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting task user: ${error}`);
    }
};

export {
    listTasks,
    retrieveTask,
    createTask,
    updateTask,
    partialUpdateTask,
    partialUpdateTaskUserAnswer,
    deleteTask,
    retrieveTaskUser,
    createTaskUser,
    updateTaskUser,
    partialUpdateTaskUser,
    deleteTaskUser,
};
