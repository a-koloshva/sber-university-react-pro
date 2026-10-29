export const debounce = <TArgs extends unknown[]>(
    fn: (...args: TArgs) => void,
    delay: number = 300,
): ((...args: TArgs) => void) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return (...args: TArgs): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};

export const formatGreeting = (name: string): string => `Hello, ${name}!`;

export const formatStatus = (status: string): string => `Status: ${status}`;

export const formatUnusedNotice = (): string => 'TREE_SHAKING_SENTINEL';
