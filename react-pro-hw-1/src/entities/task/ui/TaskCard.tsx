import { memo } from 'react';
import type { Task } from '../model/types';
import styles from './TaskCard.module.css';

type Props = {
    task: Task;
    removeTask: (id: Task['id']) => void;
    toggleTask: (id: Task['id']) => void;
};

export const TaskCard = memo(function TaskCard({ task, removeTask, toggleTask }: Props) {
    const handleRemoveTask = () => removeTask(task.id);
    const handleToggleTask = () => toggleTask(task.id);

    return (
        <div className={styles.task}>
            <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                checked={task.completed}
                className={styles.checkbox}
                onChange={handleToggleTask}
            />
            <div className={`${styles.title} ${task.completed ? styles.completed : ''}`}>
                {task.title}
            </div>
            <button type="button" className={styles.delete} onClick={handleRemoveTask}>
                удалить
            </button>
        </div>
    );
});
