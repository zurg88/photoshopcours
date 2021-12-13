import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import { Button, Input, Rating, Textarea } from '..';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IreviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, className, isOpened, ...props }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IreviewForm>()

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setIsError] = useState<string>();

	const onSubmit = async (formData: IreviewForm) => {

		try {
			const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setIsError('Что-то пошло не так');
			}
		} catch (error) {
			setIsError(error.message);
		}

	};

	return (

		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>

				<Input
					{...register('name', { required: { value: true, message: 'Заполните имя' } })}
					placeholder="Имя"
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
					placeholder="Заголовок отзыва"
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>

				<div className={styles.rating}>
					<span> Оценка: </span>

					<Controller
						control={control}
						name='rating'
						rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
						render={({ field }) => (
							<Rating
								isEditable
								className={styles.userRating}
								rating={field.value}
								setRating={field.onChange}
								ref={field.ref}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>

				<Textarea
					className={styles.description}
					placeholder="Текст отзыва"
					{...register('description', { required: { value: true, message: 'Заполните поле отзыва' } })}
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label="Текст отзыва"
					aria-invalid={errors.description ? true : false}
				/>

				<div className={styles.submit}>
					<Button className={styles.submitBtn}
						appearance='primary'
						tabIndex={isOpened ? 0 : -1}
						onClick={() => clearErrors()}
					>
						Отправить
					</Button>
					<span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>

			{isSuccess && <div className={styles.success} role='alert'>
				<span className={styles.successTitle}>Ваш отзыв отправлен</span>
				<p className={styles.successInfo}>
					Спасибо, ваш отзыв будет опубликован после проверки!
				</p>
				<button
					className={styles.closeBtn}
					onClick={() => setIsSuccess(false)}
					aria-label="Закрыть оповещение"
				>
					<CloseIcon className={styles.closeIcon} />
				</button>

			</div>}

			{error && <div className={styles.error} role='alert'>
				<span> Что-то пошло не так, попробуйте обновить страницу </span>
				<button
					className={styles.closeBtn}
					onClick={() => setIsError(undefined)}
					aria-label="Закрыть оповещение"
				>
					<CloseIcon className={styles.closeIcon} />
				</button>
			</div>}
		</form>

	);
};

