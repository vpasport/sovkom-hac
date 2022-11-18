import { ButtonHTMLAttributes, ElementType, ReactElement } from 'react';

type ButtonTypes = 'border' | 'default' | 'light' | 'lightborder' | 'text';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rightIcon?: ReactElement | null;
  leftIcon?: ReactElement | null;
}

export interface ButtonWithTypeProps extends ButtonProps {
  buttonType: ButtonTypes;
}
