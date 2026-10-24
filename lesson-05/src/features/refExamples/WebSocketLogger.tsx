import { useEffect, useRef } from 'react';

const WEBSOCKET_URL = 'wss://echo.websocket.org';

export const WebSocketLogger = () => {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket(WEBSOCKET_URL);
        socketRef.current = socket;

        socket.addEventListener('message', (event: MessageEvent<string>) => {
            console.log('WebSocket message:', event.data);
        });

        socket.addEventListener('error', (event) => {
            console.error('WebSocket connection error:', event);
        });

        return () => {
            socketRef.current?.close();
            socketRef.current = null;
        };
    }, []);

    return <p>WebSocket соединение с echo-сервером установлено.</p>;
};
