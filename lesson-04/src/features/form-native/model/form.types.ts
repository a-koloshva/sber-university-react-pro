import { z } from 'zod';

export const schema = z.object({
    email: z.string().email({ message: 'Некорректный формат email' }),
});

export type FormFieldsValues = z.infer<typeof schema>;

export type FormState = {
    step: 1 | 2;
    success: boolean;
    email: string;
    errors: Partial<Record<keyof FormFieldsValues, string>>;
    message: string | null;
};
