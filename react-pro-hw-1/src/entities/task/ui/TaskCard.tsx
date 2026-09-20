import type { Task } from '../model/types';
import styles from './TaskCard.module.css';

type Props = {
    task: Task;
    removeTask: (id: Task['id']) => void;
};

export const TaskCard = ({ task, removeTask }: Props) => {
    const handleRemoveTask = () => removeTask(task.id);

    return (
        <div className={styles.task}>
            <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                checked={task.completed}
                className={styles.checkbox}
                readOnly
            />
            <div className={`${styles.title} ${task.completed ? styles.completed : ''}`}>
                {task.title}
            </div>
            <div className={styles.delete} onClick={handleRemoveTask}>
                удалить
            </div>
        </div>
    );
};
