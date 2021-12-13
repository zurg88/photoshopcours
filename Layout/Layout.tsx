import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';
import cn from 'classnames';
import React, { FunctionComponent, useState, KeyboardEvent, useRef } from 'react';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Sidebar } from './Sidebar/Sidebar';
import { AppContextProvider, IAppContext } from '../context/app.context';
import { Up } from '../components';

export const Layout = ({ children }: LayoutProps): JSX.Element => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
	const mainRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (key: KeyboardEvent) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			mainRef.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	};

	return (
		<div className={styles.wrapper}>
			<a
				onFocus={() => setIsSkipLinkDisplayed(true)}
				tabIndex={0}
				onKeyDown={skipContentAction}
				className={cn(styles.skipLink, {
					[styles.displayed]: isSkipLinkDisplayed
				})}
			>
				Сразу к содержанию
			</a>

			< Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<main className={styles.main} ref={mainRef} tabIndex={0} role='main'>
				{children}
			</main>
			<Footer />
			<Up />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>

		);
	};
};