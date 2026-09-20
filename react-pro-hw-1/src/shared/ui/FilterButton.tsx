import type { ButtonHTMLAttributes } from 'react';
import styles from './FilterButton.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const FilterButton = ({ children, ...props }: Props) => {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
};
