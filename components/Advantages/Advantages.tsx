import styles from './Advantages.module.css';
import { AdvantagesProps } from './Advantages.props';
import cn from 'classnames';
import AdvantagesIcon from './AdvantagesIcon.svg';
import React from 'react';
import { Htag, Paragraph } from '..';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<>
			<Htag tag='h2'>Приимущества</Htag>
			<ul className={styles.advantagesList}>
				{advantages.map(a => (
					<li className={styles.advantagesItem} key={a._id}>
						<div className={styles.advantagesItemIconBlock}>
							<div className={styles.advantagesItemIcon}>
								<AdvantagesIcon />
							</div>
						</div>
						<div className={styles.advantagesItemInfoBlock}>
							<Htag tag='h3'> {a.title} </Htag>
							<Paragraph> {a.description} </Paragraph>
						</div>
					</li>
				))}
			</ul>

		</>
	);
};

