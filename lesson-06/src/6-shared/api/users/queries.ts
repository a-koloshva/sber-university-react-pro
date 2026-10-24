import { api } from '../base';
import type { UserProfile } from './types';

export const getCurrentUser = (accessToken: string) =>
    api
        .get('users/me', {
            headers: {
                Authorization: `${accessToken}`,
            },
        })
        .json<UserProfile>();
