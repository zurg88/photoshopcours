import styles from './Sort.module.css';
import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './Sort.svg';
import cn from 'classnames';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {

	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div className={styles.sortName} id='sort'>сортировка</div>
			<button
				id='sortRating'
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating
				})}
				aria-labelledby='sort sortRating'
			>
				<SortIcon className={styles.sortIcon} /> По рейтингу
			</button>

			<button
				id='sortPrice'
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price
				})}
				aria-labelledby='sort sortPrice'
			>
				<SortIcon className={styles.sortIcon} /> По цене
			</button>
		</div>
	);
};

