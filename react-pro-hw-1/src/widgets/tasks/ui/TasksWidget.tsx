import { useTasksList, TasksList, TasksFilters } from 'features/taskList';

export const TasksWidget = () => {
    const { tasks, filters, currentFilter, setCurrentFilter, removeTask, toggleTask } =
        useTasksList();

    return (
        <div>
            <TasksFilters
                filters={filters}
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
            />
            <TasksList tasks={tasks} removeTask={removeTask} toggleTask={toggleTask} />
        </div>
    );
};
