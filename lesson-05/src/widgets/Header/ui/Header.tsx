import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
    const navItems = [
        { to: '/click-timer', label: '1. Click Timer' },
        { to: '/previous-input', label: '2. Previous Input' },
        { to: '/focus-tracker', label: '3. Focus Tracker' },
        { to: '/debounced-logger', label: '4. Debounced Logger' },
        { to: '/websocket-logger', label: '5. WebSocket Logger' },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <span>useRef</span>
                </div>
                <nav className={styles.nav}>
                    {navItems.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `
                ${styles.navLink} 
                ${isActive ? styles.active : ''}
              `}>
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
};
