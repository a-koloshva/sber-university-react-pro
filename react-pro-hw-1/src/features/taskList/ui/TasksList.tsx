import { TaskCard, type Task } from 'entities/task';

type Props = {
    tasks: Task[];
    removeTask: (id: Task['id']) => void;
    toggleTask: (id: Task['id']) => void;
};

export const TasksList = ({ tasks, removeTask, toggleTask }: Props) => {
    return (
        <div>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    removeTask={removeTask}
                    toggleTask={toggleTask}
                />
            ))}
        </div>
    );
};
