import type { Task } from 'entities/task';
import { useState } from 'react';
import type { Filter, Filters } from './types';

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
} => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [currentFilter, setCurrentFilter] = useState<Filter>('all');

    const filteredTasks = tasks.filter((task) => {
        if (currentFilter === 'completed') {
            return task.completed;
        }

        if (currentFilter === 'incomplete') {
            return !task.completed;
        }

        return tasks;
    });

    const removeTask = (id: Task['id']) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return { tasks: filteredTasks, filters, currentFilter, setCurrentFilter, removeTask };
};
