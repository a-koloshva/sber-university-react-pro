import type { Task } from 'entities/task';
import { baseApi } from 'shared/api/baseApi';

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task[], void>({
            query: () => 'todos',
            transformResponse: (response: Task[]) => response,
        }),
    }),
});

export const { useGetTasksQuery } = tasksApi;
