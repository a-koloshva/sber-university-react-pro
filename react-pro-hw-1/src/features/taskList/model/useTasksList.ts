import type { Task } from 'entities/task';
import { useMemo, useState } from 'react';
import { useTasks } from './useTasks';
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
    const { tasks, removeTask, toggleTask } = useTasks();

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

    return {
        tasks: filteredTasks,
        filters,
        currentFilter,
        setCurrentFilter,
        removeTask,
        toggleTask,
    };
};
