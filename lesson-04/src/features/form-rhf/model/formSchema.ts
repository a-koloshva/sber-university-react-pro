import { z } from 'zod';

export const socialSchema = z.object({
    socialName: z.string().min(1, 'Название соцсети обязательно'),
    socialLink: z.string().min(1, 'Ссылка на соцсеть обязательна'),
});

export const userRegistrationSchema = z
    .object({
        username: z
            .string()
            .min(3, 'Имя пользователя должно быть не менее 3 символов')
            .regex(/^[\p{L}_-]+$/u, {
                message: 'Имя пользователя может содержать только буквы, подчёркивание и дефис',
            }),
        email: z.email({ message: 'Некорректный формат email' }),
        password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
        confirmPassword: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
        social: z.array(socialSchema).min(1, 'Должна быть хотя бы одна ссылка на соцсети'),
    })
    .refine((values) => values.password === values.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type UserRegistrationValues = z.infer<typeof userRegistrationSchema>;

export const defaultValues: UserRegistrationValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    social: [
        {
            socialName: '',
            socialLink: '',
        },
    ],
};
