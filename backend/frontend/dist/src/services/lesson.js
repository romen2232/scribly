import { apiClient } from './api';
/** Fetches all lessons from the API
 * @param token JWT token
 * @returns List of lessons
 * @throws Error if fetching lessons fails
 */
const listLessons = async (token) => {
    try {
        const response = await apiClient.get('/api/v1/lessons/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error listing lessons: ${error}`);
    }
};
/** Fetches a specific lesson from the API
 * @param lessonId Lesson ID
 * @param token JWT token
 * @returns Lesson
 * @throws Error if fetching the specific lesson fails
 */
const retrieveLesson = async (lessonId, token) => {
    try {
        const response = await apiClient.get(`/api/v1/lesson/${lessonId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving lesson: ${error}`);
    }
};
/** Creates a lesson
 * @param lesson Lesson object
 * @param token JWT token
 * @returns Lesson
 * @throws Error if creating lesson fails
 * */
const createLesson = async (lesson, token) => {
    try {
        const response = await apiClient.post(`/api/v1/lessons/`, lesson, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error creating lesson: ${error}`);
    }
};
/** Updates a lesson
 * @param lesson Lesson object
 * @param token JWT token
 * @returns Lesson
 * @throws Error if updating lesson fails
 * */
const updateLesson = async (lesson, token) => {
    try {
        const response = await apiClient.put(`/api/v1/lesson/${lesson.id}/`, lesson, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating lesson: ${error}`);
    }
};
/** Partially updates a lesson
 * @param lessonId Lesson ID
 * @param lesson Lesson object
 * @param token JWT token
 * @returns Lesson
 * @throws Error if partially updating lesson fails
 * */
const partialUpdateLesson = async (lessonId, lesson, token) => {
    try {
        const response = await apiClient.patch(`/api/v1/lesson/${lessonId}/`, lesson, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error partially updating lesson: ${error}`);
    }
};
/** Deletes a lesson
 * @param lessonId Lesson ID
 * @param token JWT token
 * @throws Error if deleting lesson fails
 * */
const deleteLesson = async (lessonId, token) => {
    try {
        await apiClient.delete(`/api/v1/lesson/${lessonId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    catch (error) {
        throw new Error(`Error deleting lesson: ${error}`);
    }
};
/** Fetches all lessonsUser relationship from the API
 * @param token JWT token
 * @returns List of lessonsUsers
 * @throws Error if fetching lessons fails
 */
const listLessonsUsers = async (token) => {
    try {
        const response = await apiClient.get('/api/v1/lesson/user/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error listing lessonsUsers: ${error}`);
    }
};
/** Fetches a specific lessonUser relationship from the API, if it doesn't exist or all created are at 100%, it creates a new one. It also creates the necessary tasks for the lesson.
 * @param lessonId Lesson ID
 * @param token JWT token
 * @returns LessonUser
 * @throws Error if fetching the specific lessonUser fails
 */
const retrieveCurrentLessonUser = async (lessonId, token) => {
    try {
        const response = await apiClient.post(`/api/v1/lesson/start/${lessonId}/`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error retrieving lessonUser: ${error}`);
    }
};
/** Updates a lessonUser relationship
 * @param lessonUser LessonUser object
 * @param token JWT token
 * @returns LessonUser
 * @throws Error if updating lessonUser fails
 * */
const updateLessonUser = async (lessonUser, token) => {
    try {
        const response = await apiClient.put(`/api/v1//user/lesson/${lessonUser.id}/`, lessonUser, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error updating lessonUser: ${error}`);
    }
};
/** Partially updates a lessonUser relationship
 * @param lessonUserId LessonUser ID
 * @param lessonUser LessonUser object
 * @param token JWT token
 * @returns LessonUser
 * @throws Error if partially updating lessonUser fails
 * */
const partialUpdateLessonUser = async (lessonUserId, lessonUser, token) => {
    try {
        const response = await apiClient.patch(`/api/v1/user/lesson/${lessonUserId}/`, lessonUser, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Error partially updating lessonUser: ${error}`);
    }
};
/** Deletes a lessonUser relationship
 * @param lessonUserId LessonUser ID
 * @param token JWT token
 * @throws Error if deleting lessonUser fails
 * */
const deleteLessonUser = async (lessonUserId, token) => {
    try {
        await apiClient.delete(`/api/v1/user/lesson/${lessonUserId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    catch (error) {
        throw new Error(`Error deleting lessonUser: ${error}`);
    }
};
export { listLessons, retrieveLesson, createLesson, updateLesson, partialUpdateLesson, deleteLesson, listLessonsUsers, retrieveCurrentLessonUser, updateLessonUser, partialUpdateLessonUser, deleteLessonUser, };
