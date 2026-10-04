import { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import type { Task } from 'entities/task';
import { useGetTasksQuery } from '../api/tasksApi';

export const useTasks = () => {
    const { data: remoteTasks } = useGetTasksQuery();
    const [tasks, setTasks] = useState<Task[]>([]);
    const hasCopiedRemoteTasks = useRef(false);

    useEffect(() => {
        if (!remoteTasks || hasCopiedRemoteTasks.current) {
            return;
        }

        hasCopiedRemoteTasks.current = true;
        startTransition(() => setTasks(remoteTasks));
    }, [remoteTasks]);

    const removeTask = useCallback((id: number) => {
        setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));
    }, []);

    const toggleTask = useCallback((id: number) => {
        setTasks((previousTasks) =>
            previousTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task,
            ),
        );
    }, []);

    return { tasks, removeTask, toggleTask };
};
