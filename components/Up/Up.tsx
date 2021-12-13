import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import styles from './Up.module.css';

export const Up = (): JSX.Element => {
	const controls = useAnimation();
	const y = useScrollY();
	useEffect(() => {
		controls.start({ opacity: (y / document.body.scrollHeight) * 2 });
	}, [y, controls]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	};

	return (
		<motion.div
			className={styles.up}
			animate={controls}
			initial={{ opacity: 0 }}
		>
			<ButtonIcon appearance='primary' icon='upArrowIcon' onClick={scrollToTop} />
		</motion.div>
	);
};

