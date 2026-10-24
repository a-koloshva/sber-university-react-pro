import { useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Input } from '@/shared/ui';

export const DebouncedLogger = () => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        const value = event.currentTarget.value;
        timeoutRef.current = setTimeout(() => {
            console.log(value);
            timeoutRef.current = null;
        }, 1000);
    };

    return (
        <div>
            <Input
                type="text"
                onChange={handleChange}
                aria-label="Введите текст"
                placeholder="Введите текст..."
            />
        </div>
    );
};
