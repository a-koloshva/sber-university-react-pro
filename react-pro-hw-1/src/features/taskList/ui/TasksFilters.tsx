import { FilterButton } from 'shared/index';
import type { Filter, Filters } from '../model/types';
import styles from './TasksFilters.module.css';

type Props = {
    filters: Filters[];
    currentFilter: Filter;
    setCurrentFilter: (filter: Filter) => void;
};

export const TasksFilters = ({ filters, currentFilter, setCurrentFilter }: Props) => {
    const handleChangeFilter = (value: Filter) => () => setCurrentFilter(value);

    return (
        <div className={styles.filters}>
            {filters.map(({ value, label }) => (
                <FilterButton
                    key={value}
                    type="button"
                    onClick={handleChangeFilter(value)}
                    disabled={currentFilter === value}>
                    {label}
                </FilterButton>
            ))}
        </div>
    );
};
