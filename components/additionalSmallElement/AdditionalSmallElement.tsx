import styles from './AdditionalSmallElement.module.css';
import { ParagraphProps } from './AdditionalSmallElement.props';
import cn from 'classnames';

export const AdditionalSmallElement = ({ children, size = 'm', color = "ghost", href, className, ...props }: ParagraphProps): JSX.Element => {
	return (
		<div
			className={cn(styles.AdditionalSmallElement, className, {
				[styles.s]: size == 's',
				[styles.m]: size == 'm',
				[styles.ghost]: color == 'ghost',
				[styles.red]: color == 'red',
				[styles.green]: color == 'green',
				[styles.grey]: color == 'grey',
				[styles.accent]: color == 'accent',
			})}
			{...props}
		>
			{
				href
					? <a>{children}</a>
					: <>{children}</>
			}

		</div>
	);
};

