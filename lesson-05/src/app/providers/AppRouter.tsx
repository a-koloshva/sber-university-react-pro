import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ClickTimer } from '@/features/refExamples/ClickTimer';
import { DebouncedLogger } from '@/features/refExamples/DebouncedLogger';
import { FocusTracker } from '@/features/refExamples/FocusTracker';
import { PreviousInput } from '@/features/refExamples/PreviousInput';
import { WebSocketLogger } from '@/features/refExamples/WebSocketLogger';

import { AppLayout } from '../App';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <Navigate to="/click-time" replace /> },
            { path: 'click-timer', element: <ClickTimer /> },
            { path: 'debounced-logger', element: <DebouncedLogger /> },
            { path: 'previous-input', element: <PreviousInput /> },
            { path: 'focus-tracker', element: <FocusTracker /> },
            { path: 'websocket-logger', element: <WebSocketLogger /> },
        ],
    },
]);

export const AppRouter = () => <RouterProvider router={router} />;
