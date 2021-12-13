import { type } from 'os';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import closeIcon from './closeIcon.svg';
import mobileMenuIcon from './mobileMenuIcon.svg';
import upArrowIcon from './up.svg';

export const icons = { closeIcon, mobileMenuIcon, upArrowIcon }

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	appearance: 'primary' | 'white';
	icon: IconName;
}