import styles from './Footer.module.css';
import { FooterProps } from './Footer.props';
import { format } from 'date-fns'
import cn from 'classnames';

export const Footer = ({ ...props }: FooterProps): JSX.Element => {
	return (
		<footer {...props} className={styles.footer}>
			<span className={styles.footerInfo}>OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены</span>
			<a className={styles.footerLink} href="#" target="_blank">Пользовательское соглашение</a>
			<a className={styles.footerLink} href="#" target="_blank">Политика конфиденциальности</a>
		</footer>
	);
};

