import React from 'react';
import { withLayout } from '../Layout/Layout';
import axios, { AxiosResponse } from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { GetStaticProps } from 'next';
import { API } from '../helpers/api';

function Search(): JSX.Element {
	return (
		<>
			SEARCH
		</>
	)
};

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {

	const firstCategory = 0;
	const { data: menu }: AxiosResponse<MenuItem[]> = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		},
		revalidate: 60
	}
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}