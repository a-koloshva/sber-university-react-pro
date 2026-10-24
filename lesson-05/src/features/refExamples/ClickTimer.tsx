import { Button } from '@/shared/ui';
import { useRef } from 'react';

interface ClickData {
    startTime: number | null;
    clickCount: number;
}

export const ClickTimer = () => {
    const clickDataRef = useRef<ClickData>({
        startTime: null,
        clickCount: 0,
    });

    const handleClick = () => {
        const now = Date.now();
        const clickData = clickDataRef.current;

        if (clickData.startTime === null) {
            clickData.startTime = now;
        }

        clickData.clickCount += 1;

        if (clickData.clickCount > 1) {
            console.log({
                elapsedTime: now - clickData.startTime,
                clickCount: clickData.clickCount,
            });
        }
    };

    return (
        <div>
            <Button onClick={handleClick}>Кликни на меня и смотри в консоль!</Button>
        </div>
    );
};
