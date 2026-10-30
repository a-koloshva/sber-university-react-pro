import type { HeaderLink } from './model';

export const AUTHORIZED_LINKS: HeaderLink[] = [
    {
        href: '/profile',
        title: 'Profile',
    },
    {
        href: '/signOut',
        title: 'Выйти',
    },
];

export const UNAUTHORIZED_LINKS: HeaderLink[] = [
    {
        href: '/signUp',
        title: 'SignUp',
    },
    {
        href: '/login',
        title: 'Login',
    },
];

export const PUBLIC_LINKS: HeaderLink[] = [
    {
        href: '/public',
        title: 'Public',
    },
];
