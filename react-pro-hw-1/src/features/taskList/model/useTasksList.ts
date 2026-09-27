import type { Task } from 'entities/task';
import { useCallback, useMemo, useState } from 'react';
import type { Filter, Filters } from './types';

const filters: Filters[] = [
    { value: 'all', label: 'Все' },
    { value: 'completed', label: 'Выполненные' },
    { value: 'incomplete', label: 'Невыполненные' },
];

export const useTasksList = (): {
    tasks: Task[];
    filters: Filters[];
    currentFilter: Filter;
    setCurrentFilter: (filter: Filter) => void;
    removeTask: (id: Task['id']) => void;
    toggleTask: (id: Task['id']) => void;
} => {
    const initialTasks: Task[] = [
        {
            id: '1',
            title: 'сделать домашку',
            completed: false,
        },
        {
            id: '2',
            title: 'покормить кошку',
            completed: true,
        },
        {
            id: '3',
            title: 'сходить в магазин',
            completed: false,
        },
    ];

    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [currentFilter, setCurrentFilter] = useState<Filter>('all');

    const filteredTasks = useMemo(
        () =>
            tasks.filter((task) => {
                if (currentFilter === 'completed') {
                    return task.completed;
                }

                if (currentFilter === 'incomplete') {
                    return !task.completed;
                }

                return true;
            }),
        [tasks, currentFilter],
    );

    const removeTask = useCallback((id: Task['id']) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }, []);

    const toggleTask = useCallback((id: Task['id']) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task,
            ),
        );
    }, []);

    return {
        tasks: filteredTasks,
        filters,
        currentFilter,
        setCurrentFilter,
        removeTask,
        toggleTask,
    };
};
