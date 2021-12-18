import React from 'react';
import { withLayout } from '../Layout/Layout';
import Error from 'next/error';

export function Error404(): JSX.Element {
	return (
		<>
			<Error statusCode={404} />
		</>
	)
};

export default withLayout(Error404);