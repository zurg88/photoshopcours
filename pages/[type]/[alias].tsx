import { withLayout } from '../../Layout/Layout';
import axios, { AxiosResponse } from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ParsedUrlQuery } from 'querystring';
import { ProductModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { TopPageComponent } from '../../page-components';
import Head from 'next/head';
import { Error404 } from '../404';
import { API } from '../api/api';

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
	if (!page || !products) {
		return (
			<>
				<Error404 />
			</>
		)
	}

	return <>
		<Head>
			<title>{page.metaTitle}</title>
			<meta name='description' content={page.metaDescription} />
			<meta property='og:title' content={page.metaTitle} />
			<meta property='og:description' content={page.metaDescription} />
			<meta property='og:locale' content='ru_RU' />
			<meta property='og:type' content='article' />
		</Head>

		<TopPageComponent
			firstCategory={firstCategory}
			page={page}
			products={products}
		/>
	</>
};

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (const m of firstLevelMenu) {
		const { data: menu }: AxiosResponse<MenuItem[]> = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: TopLevelCategory.Courses
		});
		paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));

	}
	return {
		paths,
		fallback: true
	};
};

export default withLayout(TopPage);

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		};
	}
	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
	if (!firstCategoryItem) {
		return {
			notFound: true
		};
	}


	const { data: menu }: AxiosResponse<MenuItem[]> = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory: TopLevelCategory.Courses
	});

	if (menu.length == 0) {
		return {
			notFound: true
		};
	}

	const { data: page }: AxiosResponse<TopPageModel> = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);
	const { data: products }: AxiosResponse<ProductModel[]> = await axios.post<ProductModel[]>(API.product.find, {
		category: page.category,
		limit: 10
	});
	return {
		props: {
			menu,
			firstCategory: TopLevelCategory.Courses,
			page,
			products
		}
	}
};

interface TopPageProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory.Courses;
	page: TopPageModel;
	products: ProductModel[];
};