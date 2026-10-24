import { useRef } from 'react';
import type { FocusEvent } from 'react';
import { Button, Input } from '@/shared/ui';

export const FocusTracker = () => {
    const firstInputRef = useRef<HTMLInputElement>(null);
    const secondInputRef = useRef<HTMLInputElement>(null);
    const transitionCountRef = useRef(0);

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        const previousElement = event.relatedTarget;
        const movedBetweenInputs =
            previousElement === firstInputRef.current || previousElement === secondInputRef.current;

        if (movedBetweenInputs) {
            transitionCountRef.current += 1;
            console.log('Переходов фокуса между полями:', transitionCountRef.current);
        }
    };

    return (
        <div>
            <Input ref={firstInputRef} onFocus={handleFocus} aria-label="Первое поле" />
            <Input ref={secondInputRef} onFocus={handleFocus} aria-label="Второе поле" />
            <Button onClick={() => firstInputRef.current?.focus()}>Сфокусировать на первом</Button>
        </div>
    );
};
