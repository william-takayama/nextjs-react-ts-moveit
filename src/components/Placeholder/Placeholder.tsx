import cn from 'clsx';
import { BaseProps } from '../../interfaces/BaseProps';
import classes from './Placeholder.module.scss';

interface PlaceholdeProps extends BaseProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  backgroundColor?: string;
}

export default function Placeholder({
  id,
  width,
  height,
  borderRadius = 'none',
  backgroundColor = 'var(--color-xx-contrast)',
  className,
  style,
}: PlaceholdeProps): JSX.Element {
  return (
    <div
      id={id}
      className={cn(className, classes.placeholder)}
      style={{
        backgroundColor,
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
}
