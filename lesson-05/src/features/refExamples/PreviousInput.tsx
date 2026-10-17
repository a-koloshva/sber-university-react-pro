import { Input } from '@/shared/ui';
import { useEffect, useRef, useState } from 'react';

export const PreviousInput = () => {
    const [value, setValue] = useState('');
    const previousValueRef = useRef('');
    const previousValueElementRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (previousValueElementRef.current) {
            previousValueElementRef.current.textContent = `Предыдущее значение: ${previousValueRef.current || '—'}`;
        }

        previousValueRef.current = value;
    }, [value]);

    return (
        <div>
            <Input
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                aria-label="Введите текст"
            />
            <p ref={previousValueElementRef}>Предыдущее значение: —</p>
        </div>
    );
};
