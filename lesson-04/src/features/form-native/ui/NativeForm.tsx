import { useActionState } from 'react';
import { submitFormAction, initialFormState } from '../model';
import styles from './NativeForm.module.css';

export const NativeForm = () => {
    const [state, formAction, isPending] = useActionState(submitFormAction, initialFormState);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Подписка на рассылку</h2>

            <form action={formAction} className={styles.form} noValidate>
                {state.step === 1 ? (
                    <>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Электронная почта
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                disabled={isPending}
                                className={`${styles.input} ${state.errors.email ? styles.inputError : ''}`}
                                placeholder="example@mail.com"
                            />
                            {state.errors.email && (
                                <span id="email-error" className={styles.errorText}>
                                    {state.errors.email}
                                </span>
                            )}
                        </div>
                        <button type="submit" disabled={isPending} className={styles.submitBtn}>
                            {isPending ? <span className={styles.spinner} /> : 'Продолжить'}
                        </button>
                    </>
                ) : (
                    <>
                        <p>
                            Подтвердите подписку для адреса <strong>{state.email}</strong>.
                        </p>
                        <button
                            type="submit"
                            disabled={isPending || state.success}
                            className={styles.submitBtn}>
                            {isPending ? (
                                <span className={styles.spinner} />
                            ) : (
                                'Подтвердить подписку'
                            )}
                        </button>
                    </>
                )}

                {state.message && (
                    <div
                        className={`${styles.statusMessage} ${state.success ? styles.success : styles.error}`}>
                        {state.message}
                    </div>
                )}
            </form>
        </div>
    );
};
