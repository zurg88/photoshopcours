import styles from './Product.module.css';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import React, { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { AdditionalSmallElement, Button, Card, Divider, Htag, Rating, Review, ReviewForm } from '..';
import { declOfNumber, priceRu } from '../../helpers/helpers';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [isRevieweOpened, setIsRevieweOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);

	const variants = {
		visible: { height: 'auto', opacity: 1 },
		hidden: { height: 0, opacity: 0 }
	};

	const scrollToReview = (e) => {
		e.preventDefault();

		setIsRevieweOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		reviewRef.current?.focus();
	};

	return (
		<div className={className} {...props} ref={ref}>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}> {product.title} </div>
				<div className={styles.price}>
					<span>
						<span className='visualyHidden'>цена</span>{priceRu(product.price)}

					</span>
					{product.oldPrice && <AdditionalSmallElement className={styles.oldPrice} color='green'>
						<span className='visualyHidden'>скидка</span>
						{priceRu(product.price - product.oldPrice)}
					</AdditionalSmallElement>}
				</div>
				<div className={styles.credit}>
					<span className='visualyHidden'>кредит</span>
					{priceRu(product.credit)}/
					<span className={styles.month}>мес</span>
				</div>
				<div className={styles.rating}>
					<span className='visualyHidden'> {'рейтинг' + (product.reviewAvg ?? product.initialRating)} </span>
					<Rating rating={product.reviewAvg ?? product.initialRating} />
				</div>

				<div className={styles.additionalElement}>
					{product.categories.map(c => <AdditionalSmallElement className={styles.category} key={c} color='ghost'> {c} </AdditionalSmallElement>)}
				</div>
				<div className={styles.priceTitle} aria-hidden={true}> цена </div>
				<div className={styles.creditTitle} aria-hidden={true}> кредит </div>
				<div className={styles.rateTitle}> <a href='#' onClick={scrollToReview}> {product.reviewCount} {declOfNumber(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])} </a> </div>

				<Divider className={styles.hr} />
				<div className={styles.description}> {product.description} </div>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div className={styles.characteristics} key={c.name}>
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && <div className={styles.advantages}>
						<Htag tag='h4'> Преимущества </Htag>
						<div> {product.advantages} </div>
					</div>}

					{product.disadvantages && <div className={styles.disadvantages}>
						<Htag tag='h4'> Недостатки </Htag>
						<div> {product.disadvantages} </div>
					</div>}
				</div>

				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						className={styles.reviewButton}
						appearance='ghost'
						arrow={isRevieweOpened ? 'down' : 'right'}
						onClick={() => setIsRevieweOpened(!isRevieweOpened)}
						aria-expanded={isRevieweOpened}
					>Читать отзывы</Button>
				</div>
			</Card>

			<motion.div variants={variants} initial={'hidden'} animate={isRevieweOpened ? 'visible' : 'hidden'}>
				<Card color='blue' className={styles.reviews} ref={reviewRef} tabIndex={isRevieweOpened ? 0 : -1}>
					{product.reviews.map(r => (
						<div key={r._id}>
							<Review review={r} />
							<Divider />
						</div>
					))}

					<ReviewForm productId={product._id} isOpened={isRevieweOpened} />
				</Card>
			</motion.div>
		</div>
	);
}));

