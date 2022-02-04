import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { AdditionalSmallElement, Advantages, HhData, Htag, Product, Sort } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import React, { useEffect, useReducer } from 'react';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer } from './sort.reducer';
import { useReducedMotion } from 'framer-motion';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });
	const shouldReduceMotion = useReducedMotion();

	const setSort = (sort: SortEnum) => {
		dispathSort({ type: sort });
	};

	useEffect(() => {
		dispathSort({ type: 'reset', initialState: products })
	}, [products]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h1'>{page.title}</Htag>
				{products && <AdditionalSmallElement color='grey' aria-label={products.length + 'элементов'} size='m'>{products.length}</AdditionalSmallElement>}
				<Sort sort={sort} setSort={setSort} />
			</div>

			<ul className={styles.productList}>
				{sortedProducts && sortedProducts.map(p => (
					<li key={p._id}> <Product layout={shouldReduceMotion ? false : true} product={p} /> </li>
				))}
			</ul>

			<div className={styles.hhTitle}>
				<Htag tag='h2'>Вакансии - {page.category}</Htag>
				<AdditionalSmallElement color='red' size='m'>hh.ru</AdditionalSmallElement>
			</div>

			{firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}

			{page.advantages && page.advantages.length > 0 &&

				<>
					{<Advantages advantages={page.advantages} />}

					{page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}

					<div className={styles.skills}>
						<Htag tag='h2'>Получаемые навыки</Htag>

						<ul className={styles.skillsList}>
							{page.tags.map(t => (
								<li className={styles.skillsItem} key={t}>
									<AdditionalSmallElement color="accent">{t}</AdditionalSmallElement>
								</li>
							))}
						</ul>
					</div>
				</>}
		</div>
	);
};