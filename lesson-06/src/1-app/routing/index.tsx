import { createBrowserRouter } from 'react-router';
import { MainPage } from '2-pages/Main';
import { NotFoundPage } from '2-pages/NotFound';
import { ProfilePage } from '2-pages/Profile';
import { PublicPage } from '2-pages/Public';
import { SignInPage } from '2-pages/SignIn';
import { SignOutPage } from '2-pages/SignOut';
import { SignUpPage } from '2-pages/SignUp';

import { ProtectedRoute } from '6-shared/ui/ProtectedRoute';
import { App } from '../App';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: 'public',
                element: <PublicPage />,
            },
            {
                path: 'profile',
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        element: <ProfilePage />,
                    },
                ],
            },
            {
                path: 'signUp',
                element: <SignUpPage />,
            },
            {
                path: 'login',
                element: <SignInPage />,
            },
            {
                path: 'signOut',
                element: <SignOutPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);
