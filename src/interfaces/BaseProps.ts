import { CSSProperties, HtmlHTMLAttributes, ReactNode } from 'react';

export interface BaseProps {
  id?: string;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export type BasePropsWithHTMLAttributesOf<
  T = HTMLElement
> = T extends HTMLElement
  ? Partial<HtmlHTMLAttributes<T> & BaseProps>
  : unknown;
