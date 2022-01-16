import styles from './Menu.module.css';
import cn from 'classnames';
import { AppContext } from '../../context/app.context';
import { useContext, KeyboardEvent, useState } from 'react';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'framer-motion';
import { Htag } from '../../components';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
	const shouldReduceMotion = useReducedMotion();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion ? {} : {
				when: 'beforeChildren',
				sraggerChildren: 0.1,
			}
		},
		hidden: { marginBottom: 0 }
	};

	const variantsChildren = {
		visible: { opacity: 1, height: 27, transition: { type: "tween", stiffness: 50 } },
		hidden: { opacity: 0, height: 0 }
	};

	const openSecondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if (m._id.secondCategory == secondCategory) {
				setAnnounce(m.isOpened ? 'closed' : 'opened')
				m.isOpened = !m.isOpened;
			}
			return m;
		}));
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const buildFirstLevel = () => {
		return (
			<ul>
				{firstLevelMenu.map(m => (
					<li key={m.route} aria-expanded={m.id == firstCategory}>
						<Htag tag='h2'>
							<div className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: m.id == firstCategory
							})}>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</Htag>
						{m.id == firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<li key={m._id.secondCategory}>
							<button
								onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}
								aria-expanded={m.isOpened}
							>
								{m._id.secondCategory}
							</button>
							<motion.ul
								layout='size'
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(p => (
				<motion.li key={p._id} layout variants={variantsChildren}>
					<Link href={`/${route}/${p.alias}`}>
						<a
							aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}
							tabIndex={isOpened ? 0 : 1}
							className={cn(styles.thirdLevel, {
								[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
							})}>
							{p.category}
						</a>
					</Link>
				</motion.li>
			))
		);
	};

	return (
		<nav className={styles.menu} role='navigation'>
			{announce && <span className='visualyHidden' role='log' > {announce == 'opened' ? 'развёрнуто' : 'свёрнуто'} </span>}
			{buildFirstLevel()}
		</nav>
	);
};
