import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import cn from 'classnames';
import SearchIcon from './Search.svg';
import { Button, Input } from '..';
import React, { useState } from 'react';
import { useRouter } from 'next/dist/client/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearchPage = () => {
		router.push({
			pathname: './search',
			query: {
				q: search
			}
		});
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key == 'Enter') {
			goToSearchPage();
		}
	};

	return (
		<form className={cn(className, styles.search)} {...props} role='search'>
			<Input placeholder='Поиск...'
				className={styles.input}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>

			<Button
				appearance='primary'
				className={styles.button}
				onClick={goToSearchPage}
				aria-label='Искать по сайту'
			>
				<SearchIcon />
			</Button>
		</form>
	);
};

