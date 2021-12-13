import styles from './Header.module.css';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import Logo from '../Logo.svg';
import React, { useEffect, useRef, useState } from 'react';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useRouter } from 'next/router';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		setIsOpened(false);
	}, [router]);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20
			}
		},

		closed: {
			opacity: 0,
			x: '100%'
		}
	};

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo />
			<ButtonIcon appearance='white' icon='mobileMenuIcon' onClick={() => setIsOpened(true)} />

			<motion.div className={styles.mobileMenu}
				variants={variants}
				initial={'closed'}
				animate={isOpened ? 'opened' : 'closed'}
			>
				<Sidebar className={styles.mobileSidebar} />
				<ButtonIcon className={styles.menuClose} appearance='white' icon='closeIcon' onClick={() => setIsOpened(false)} />
			</motion.div>
		</header>
	);
};

