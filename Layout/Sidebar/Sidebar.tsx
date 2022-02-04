import styles from './Sidebar.module.css';
import { SidebarProps } from './Sidebar.props';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';
import Logo from '../Logo.svg';
import React from 'react';
import { Search } from '../../components';
import Link from 'next/link';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>

			<Link href='/'>
				<a>
					<Logo className={styles.logo} />
				</a>
			</Link>
			<Search />
			<Menu />
		</div>
	);
};

