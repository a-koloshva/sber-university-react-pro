import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRegistrationSchema, defaultValues } from '../model';
import type { UserRegistrationValues } from '../model';
import styles from './RhfForm.module.css';

export const RhfForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<UserRegistrationValues>({
        resolver: zodResolver(userRegistrationSchema),
        defaultValues,
        mode: 'onTouched',
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'social',
    });

    const onSubmit = (values: UserRegistrationValues) => {
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Имя пользователя</label>
                    <input
                        {...register('username')}
                        className={`${styles.input} ${touchedFields.username && errors.username ? styles.inputError : ''}`}
                        placeholder="user_name"
                    />
                    {errors.username && (
                        <div className={styles.errorText}>{errors.username.message}</div>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Email пользователя</label>
                    <input
                        type="email"
                        {...register('email')}
                        className={`${styles.input} ${touchedFields.email && errors.email ? styles.inputError : ''}`}
                        placeholder="user@example.com"
                    />
                    {errors.email && <div className={styles.errorText}>{errors.email.message}</div>}
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Пароль</label>
                    <input
                        type="password"
                        {...register('password')}
                        className={`${styles.input} ${touchedFields.password && errors.password ? styles.inputError : ''}`}
                        placeholder="password"
                    />
                    {errors.password && (
                        <div className={styles.errorText}>{errors.password.message}</div>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Подтверждение пароля</label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        className={`${styles.input} ${touchedFields.confirmPassword && errors.confirmPassword ? styles.inputError : ''}`}
                        placeholder="password"
                    />
                    {errors.confirmPassword && (
                        <div className={styles.errorText}>{errors.confirmPassword.message}</div>
                    )}
                </div>

                <div className={styles.arrayContainer}>
                    <h3>Соцсети пользователя</h3>

                    <div>
                        {fields.map((field, index) => (
                            <div key={field.id} className={styles.arrayRow}>
                                <div className={`${styles.fieldGroup} ${styles.flexChild}`}>
                                    <label className={styles.label}>Название №{index + 1}</label>
                                    <input
                                        {...register(`social.${index}.socialName`)}
                                        className={`${styles.input} ${errors.social?.[index]?.socialName ? styles.inputError : ''}`}
                                    />
                                    {errors.social?.[index]?.socialName && (
                                        <div className={styles.errorText}>
                                            {errors.social[index]?.socialName?.message}
                                        </div>
                                    )}
                                </div>

                                <div className={`${styles.fieldGroup} ${styles.flexChild}`}>
                                    <label className={styles.label}>Ссылка №{index + 1}</label>
                                    <input
                                        {...register(`social.${index}.socialLink`)}
                                        className={`${styles.input} ${errors.social?.[index]?.socialLink ? styles.inputError : ''}`}
                                    />
                                    {errors.social?.[index]?.socialLink && (
                                        <div className={styles.errorText}>
                                            {errors.social[index]?.socialLink?.message}
                                        </div>
                                    )}
                                </div>

                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        className={styles.removeBtn}
                                        onClick={() => remove(index)}>
                                        Удалить
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            className={styles.addBtn}
                            onClick={() => append({ socialName: '', socialLink: '' })}>
                            + Добавить соцсеть
                        </button>
                    </div>
                </div>

                <button type="submit" className={styles.submitBtn}>
                    Забронировать
                </button>
            </form>
        </div>
    );
};
