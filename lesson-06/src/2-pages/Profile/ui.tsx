import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getCurrentUser } from '6-shared/api';
import { useAuth } from '6-shared/lib/authContext';

export const Profile: FC = () => {
    const { accessToken, logout, updateUserInfo } = useAuth();
    const navigate = useNavigate();
    const {
        data: user,
        isPending,
        isError,
    } = useQuery({
        queryKey: ['current-user', accessToken],
        queryFn: () => getCurrentUser(accessToken),
        enabled: Boolean(accessToken),
    });

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    useEffect(() => {
        if (user) {
            updateUserInfo({ userId: user.id, name: user.name });
        }
    }, [updateUserInfo, user]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="h2" align="center">
                Профиль
            </Typography>
            {isPending ? (
                <CircularProgress aria-label="Загрузка профиля" />
            ) : isError || !user ? (
                <Typography role="alert" align="center">
                    Не удалось загрузить профиль. Попробуйте обновить страницу.
                </Typography>
            ) : (
                <Typography align="center">{user.name || user.email}</Typography>
            )}
            <Button variant="outlined" onClick={handleLogout}>
                Выйти
            </Button>
        </Box>
    );
};
