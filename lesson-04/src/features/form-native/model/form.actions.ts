import { schema } from './form.types';
import type { FormState } from './form.types';

export const initialFormState: FormState = {
    step: 1,
    success: false,
    email: '',
    errors: {},
    message: null,
};

// Имитация серверного запроса (Server Action)
export async function submitFormAction(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (prevState.step === 1) {
        const validatedEmail = schema.safeParse({
            email: formData.get('email'),
        });

        if (!validatedEmail.success) {
            const emailError = validatedEmail.error.issues.find(
                (issue) => issue.path[0] === 'email',
            );

            if (!emailError) {
                throw new Error('Email validation failed without an email issue');
            }

            return {
                ...prevState,
                success: false,
                errors: { email: emailError.message },
                message: 'Пожалуйста, укажите корректный email',
            };
        }

        return {
            step: 2,
            success: false,
            email: validatedEmail.data.email,
            errors: {},
            message: null,
        };
    }

    return {
        ...prevState,
        success: true,
        errors: {},
        message: `Подписка для ${prevState.email} успешно подтверждена!`,
    };
}
