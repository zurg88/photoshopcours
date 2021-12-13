import styles from './Card.module.css';
import { CardProps } from './Card.props';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Card = forwardRef(({ color = 'white', children, className, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	return (
		<div className={cn(styles.card, className, {
			[styles.cardBlue]: color == 'blue',
		})}
			ref={ref}
			{...props}
		>
			{children}
		</div>
	);
});

